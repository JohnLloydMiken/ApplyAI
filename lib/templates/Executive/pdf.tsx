// lib/resume/renderers/executive/pdf.tsx
import { Document, Page, View, Text, StyleSheet, Font } from "@react-pdf/renderer";
import path from "path";
import type { RenderableResume } from "@/lib/templates/types";

// NOTE: This template assumes a few optional fields beyond what minimal-grid's
// usage of RenderableResume covers — all guarded, so this compiles even if
// they're absent from your current type:
//   - personal.jobTitle?: string                      (headline under the name)
//   - generated.summaryBullets?: SummaryBullet[]       (bulleted profile instead
//     of a paragraph; falls back to splitting generated.summary into sentences
//     if not provided — sub-bullets only available when you supply this field)
//   - exp.location?: string                            (e.g. "Cleveland, OH")
//   - exp.bullets entries may be plain strings OR { text, subBullets? } to
//     support the nested two-column "quantified result" sub-lists

type SummaryBullet = string | { text: string; subBullets?: string[] };
type ExperienceBullet = string | { text: string; subBullets?: string[] };

Font.register({
  family: "PT Serif",
  fonts: [
    { src: path.join(process.cwd(), "public/fonts/PTSerif-Regular.ttf"), fontWeight: "normal" },
    { src: path.join(process.cwd(), "public/fonts/PTSerif-Bold.ttf"), fontWeight: "bold" },
    {
      src: path.join(process.cwd(), "public/fonts/PTSerif-Italic.ttf"),
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: path.join(process.cwd(), "public/fonts/PTSerif-BoldItalic.ttf"),
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

const INK = "#1A1A1A";
const MUTED = "#3A3A3A";

const styles = StyleSheet.create({
  page: {
    paddingVertical: 34,
    paddingHorizontal: 42,
    fontFamily: "PT Serif",
    fontSize: 9.5,
    color: INK,
  },

  // Header
  name: {
    fontSize: 19,
    fontWeight: "bold",
    letterSpacing: 1.5,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 3,
  },
  addressLine: {
    fontSize: 9,
    letterSpacing: 0.5,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: INK,
    paddingVertical: 3,
    marginBottom: 8,
  },
  contactText: { fontSize: 9 },
  headline: {
    fontSize: 12.5,
    fontWeight: "bold",
    letterSpacing: 0.5,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 10,
  },

  // Ruled section heading (line running through centered text)
  headingWrap: { position: "relative", height: 14, marginBottom: 6, justifyContent: "center" },
  headingLine: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 7,
    borderBottomWidth: 1,
    borderBottomColor: INK,
  },
  headingText: {
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    fontSize: 10.5,
    fontWeight: "bold",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  section: { marginBottom: 10 },

  // Bullets
  bulletRow: { flexDirection: "row", marginBottom: 3 },
  bulletMark: { width: 12, fontSize: 8 },
  bulletText: { flex: 1, fontSize: 9.5, lineHeight: 1.4, color: MUTED },

  subBulletGrid: { flexDirection: "row", flexWrap: "wrap", marginLeft: 20, marginBottom: 3 },
  subBulletCol: { width: "50%", paddingRight: 8 },
  subBulletRow: { flexDirection: "row", marginBottom: 1 },
  subBulletMark: { width: 10, fontSize: 9 },
  subBulletText: { flex: 1, fontSize: 9, lineHeight: 1.35, color: MUTED },

  // Areas of Expertise (3 columns)
  expertiseGrid: { flexDirection: "row" },
  expertiseCol: { flex: 1, paddingRight: 10 },

  // Experience
  expBlock: { marginBottom: 8 },
  expHeaderText: { fontSize: 9.5, lineHeight: 1.4, marginBottom: 3 },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
});

function RuledHeading({ children }: { children: string }) {
  return (
    <View style={styles.headingWrap}>
      <View style={styles.headingLine} />
      <Text style={styles.headingText}>{children}</Text>
    </View>
  );
}

function isBulletObj(
  b: SummaryBullet | ExperienceBullet
): b is { text: string; subBullets?: string[] } {
  return typeof b === "object" && b !== null;
}

function BulletList({ items }: { items: (SummaryBullet | ExperienceBullet)[] }) {
  return (
    <>
      {items.map((item, i) => {
        const text = isBulletObj(item) ? item.text : item;
        const subBullets = isBulletObj(item) ? item.subBullets : undefined;
        return (
          <View key={i}>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletMark}>◆</Text>
              <Text style={styles.bulletText}>{text}</Text>
            </View>
            {subBullets && subBullets.length > 0 && (
              <View style={styles.subBulletGrid}>
                {chunkAlternating(subBullets).map((col, ci) => (
                  <View key={ci} style={styles.subBulletCol}>
                    {col.map((sb, si) => (
                      <View key={si} style={styles.subBulletRow}>
                        <Text style={styles.subBulletMark}>–</Text>
                        <Text style={styles.subBulletText}>{sb}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </>
  );
}

// Splits a flat list into 2 columns, filling left-to-right then top-to-bottom
// (matches the screenshot's left-column-first sub-bullet layout).
function chunkAlternating<T>(items: T[]): [T[], T[]] {
  const half = Math.ceil(items.length / 2);
  return [items.slice(0, half), items.slice(half)];
}

function sentenceBullets(summary: string): string[] {
  return summary
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function ExecutivePdf({ data }: { data: RenderableResume }) {
  const { personal, generated } = data;

  const summaryBullets: SummaryBullet[] =
    (generated as any).summaryBullets ??
    (generated.summary ? sentenceBullets(generated.summary) : []);

  const allSkills = [
    ...(generated.skills?.technical ?? []),
    ...(generated.skills?.tools ?? []),
    ...(generated.skills?.soft ?? []),
  ];
  const expertiseColCount = 3;
  const expertiseColSize = Math.ceil(allSkills.length / expertiseColCount) || 1;
  const expertiseCols: string[][] = [];
  for (let i = 0; i < allSkills.length; i += expertiseColSize) {
    expertiseCols.push(allSkills.slice(i, i + expertiseColSize));
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.name}>{personal.fullName}</Text>
        {personal.address && <Text style={styles.addressLine}>{personal.address}</Text>}

        <View style={styles.contactRow}>
          <Text style={styles.contactText}>{personal.phone ?? ""}</Text>
          <Text style={styles.contactText}>{personal.email ?? ""}</Text>
        </View>

        {(personal as any).jobTitle && (
          <Text style={styles.headline}>{(personal as any).jobTitle}</Text>
        )}

        {/* Professional Profile */}
        {summaryBullets.length > 0 && (
          <View style={styles.section}>
            <RuledHeading>Professional Profile</RuledHeading>
            <BulletList items={summaryBullets} />
          </View>
        )}

        {/* Areas of Expertise */}
        {allSkills.length > 0 && (
          <View style={styles.section}>
            <RuledHeading>Areas of Expertise</RuledHeading>
            <View style={styles.expertiseGrid}>
              {expertiseCols.map((col, ci) => (
                <View key={ci} style={styles.expertiseCol}>
                  <BulletList items={col} />
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Professional Experience */}
        {generated.experience?.length > 0 && (
          <View style={styles.section}>
            <RuledHeading>Professional Experience</RuledHeading>
            {generated.experience.map((exp) => {
              const location = (exp as any).location as string | undefined;
              return (
                <View key={exp.id} style={styles.expBlock}>
                  <Text style={styles.expHeaderText}>
                    <Text style={styles.bold}>{exp.role}</Text>
                    {", "}
                    <Text style={styles.italic}>{exp.company}</Text>
                    {location ? `, ${location}` : ""}
                    {`, ${exp.startYear} to ${exp.endYear}`}
                  </Text>
                  <BulletList items={(exp.bullets as ExperienceBullet[]) ?? []} />
                </View>
              );
            })}
          </View>
        )}

        {/* Education */}
        {generated.education?.length > 0 && (
          <View style={styles.section}>
            <RuledHeading>Education</RuledHeading>
            {generated.education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 4 }}>
                <Text style={styles.expHeaderText}>
                  <Text style={styles.bold}>{edu.degree}</Text>
                  {", "}
                  <Text style={styles.italic}>{edu.school}</Text>
                  {`, ${edu.startYear} to ${edu.endYear}`}
                </Text>
                {edu.highlight && (
                  <View style={styles.bulletRow}>
                    <Text style={styles.bulletMark}>◆</Text>
                    <Text style={styles.bulletText}>{edu.highlight}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}