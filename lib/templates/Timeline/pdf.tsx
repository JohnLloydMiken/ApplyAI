// lib/resume/renderers/timeline/pdf.tsx
import { Document, Page, View, Text, StyleSheet, Font } from "@react-pdf/renderer";
import path from "path";
import type { RenderableResume } from "@/lib/templates/types";

// NOTE: This template assumes a few optional fields beyond what minimal-grid's
// usage of RenderableResume covers — all guarded, so this compiles even if
// they're absent from your current type:
//   - personal.jobTitle?: string                     (subtitle under the name)
//   - exp.location? / edu.location?: string           (appended after the
//     company/school in the left timeline column, e.g. "Lorem Company, Texas")
//   - data.references?: { id, name, title?, phone?, email? }[]
//   - skills entries may be plain strings OR { name, level? } for the progress
//     bars (level 0-100, defaults to 75 when not given)
//
// Body/meta text uses react-pdf's built-in "Helvetica" standard font family
// (no TTF needed). Only the display font below needs a font file.

Font.register({
  family: "Montserrat",
  fonts: [
    { src: path.join(process.cwd(), "public/fonts/Montserrat-Bold.ttf"), fontWeight: "bold" },
  ],
});

const INK = "#2B2B2B";
const GRAY = "#8C8C8C";
const LINE = "#CCCCCC";
const BAR_TRACK = "#E5E5E5";
const BAR_FILL = "#4A4A4A";

const styles = StyleSheet.create({
  page: { padding: 0 },
  frame: { flex: 1, borderWidth: 24, borderColor: "#2B2B2B", padding: 30 },

  // Header
  headerRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  nameLine: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 25,
    letterSpacing: 1,
    color: INK,
    lineHeight: 1.05,
  },
  roleSubtitle: {
    fontFamily: "Helvetica",
    fontSize: 9,
    letterSpacing: 2.5,
    color: GRAY,
    marginTop: 6,
    textTransform: "uppercase",
  },
  addressBlock: { alignItems: "flex-end" },
  addressLine: { fontFamily: "Helvetica-Bold", fontSize: 8, color: INK, marginBottom: 2 },
  headerDivider: { borderBottomWidth: 1, borderBottomColor: LINE, marginBottom: 18 },

  // Sections
  section: { marginBottom: 18 },
  sectionHeading: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 11,
    letterSpacing: 2,
    color: INK,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  sectionRule: { width: 110, borderBottomWidth: 1.5, borderBottomColor: INK, marginBottom: 14 },

  // Timeline entries
  entryRow: { flexDirection: "row", marginBottom: 16 },
  dotCol: { width: 16, alignItems: "center" },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: INK, marginTop: 2 },
  dotLine: { flexGrow: 1, width: 1, backgroundColor: LINE, marginTop: 4 },
  leftTextCol: { width: 130, paddingRight: 8 },
  leftTextOrg: { fontFamily: "Helvetica-Bold", fontSize: 9, color: INK, marginBottom: 2 },
  leftTextDate: { fontFamily: "Helvetica", fontSize: 8.5, color: GRAY },
  rightTextCol: { flex: 1 },
  rightTitle: { fontFamily: "Helvetica-Bold", fontSize: 9.5, color: INK, marginBottom: 3 },
  rightDesc: { fontFamily: "Helvetica", fontSize: 8.5, lineHeight: 1.45, color: GRAY },

  // Footer: References + Skills
  footerRow: { flexDirection: "row", gap: 24 },
  footerCol: { flex: 1 },
  refGrid: { flexDirection: "row", flexWrap: "wrap" },
  refItem: { width: "50%", paddingRight: 10, marginBottom: 12 },
  refName: { fontFamily: "Helvetica-Bold", fontSize: 9, color: INK, marginBottom: 1 },
  refTitle: { fontFamily: "Helvetica", fontSize: 8.5, color: GRAY, marginBottom: 3 },
  refMetaText: { fontSize: 8, color: INK, marginBottom: 1 },
  refMetaLabel: { fontFamily: "Helvetica-Bold" },

  skillRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  skillName: { width: 70, fontFamily: "Helvetica", fontSize: 8.5, color: INK },
  skillTrack: { flex: 1, height: 4, backgroundColor: BAR_TRACK },
  skillFill: { height: 4, backgroundColor: BAR_FILL },
});

type SkillEntry = string | { name: string; level?: number };
function skillName(s: SkillEntry): string {
  return typeof s === "string" ? s : s.name;
}
function skillLevel(s: SkillEntry): number {
  return typeof s === "string" ? 75 : s.level ?? 75;
}

function TimelineList({
  items,
}: {
  items: {
    id: string;
    org: string;
    dateLabel: string;
    title: string;
    desc?: string;
  }[];
}) {
  return (
    <>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <View key={item.id} style={styles.entryRow}>
            <View style={styles.dotCol}>
              <View style={styles.dot} />
              {!isLast && <View style={styles.dotLine} />}
            </View>
            <View style={styles.leftTextCol}>
              <Text style={styles.leftTextOrg}>{item.org}</Text>
              <Text style={styles.leftTextDate}>{item.dateLabel}</Text>
            </View>
            <View style={styles.rightTextCol}>
              <Text style={styles.rightTitle}>{item.title}</Text>
              {item.desc && <Text style={styles.rightDesc}>{item.desc}</Text>}
            </View>
          </View>
        );
      })}
    </>
  );
}

export function TimelinePdf({ data }: { data: RenderableResume }) {
  const { personal, generated } = data;

  const addressLines = [personal.address, personal.phone && `t: ${personal.phone}`, personal.email && `e: ${personal.email}`]
    .filter(Boolean) as string[];

  const experienceItems = (generated.experience ?? []).map((exp) => {
    const location = (exp as any).location as string | undefined;
    return {
      id: exp.id,
      org: location ? `${exp.company}, ${location}` : exp.company,
      dateLabel: `${exp.startYear} - ${exp.endYear}`,
      title: exp.role,
      desc: exp.bullets?.join(" "),
    };
  });

  const educationItems = (generated.education ?? []).map((edu) => {
    const location = (edu as any).location as string | undefined;
    return {
      id: edu.id,
      org: location ? `${edu.school}, ${location}` : edu.school,
      dateLabel: `${edu.endYear}`,
      title: edu.degree,
      desc: edu.highlight,
    };
  });

  const references = (data as any).references as
    | { id: string; name: string; title?: string; phone?: string; email?: string }[]
    | undefined;

  const skills: SkillEntry[] = [
    ...(generated.skills?.technical ?? []),
    ...(generated.skills?.tools ?? []),
    ...(generated.skills?.soft ?? []),
  ] as SkillEntry[];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.frame}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.nameLine}>{personal.fullName}</Text>
              {(personal as any).jobTitle && (
                <Text style={styles.roleSubtitle}>{(personal as any).jobTitle}</Text>
              )}
            </View>
            {addressLines.length > 0 && (
              <View style={styles.addressBlock}>
                {addressLines.map((line, i) => (
                  <Text key={i} style={styles.addressLine}>
                    {line}
                  </Text>
                ))}
              </View>
            )}
          </View>
          <View style={styles.headerDivider} />

          {/* Work Experience */}
          {experienceItems.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Work Experiences</Text>
              <View style={styles.sectionRule} />
              <TimelineList items={experienceItems} />
            </View>
          )}

          {/* Education */}
          {educationItems.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Education</Text>
              <View style={styles.sectionRule} />
              <TimelineList items={educationItems} />
            </View>
          )}

          {/* References + Skills */}
          {(references?.length || skills.length > 0) && (
            <View style={styles.footerRow}>
              {references && references.length > 0 && (
                <View style={styles.footerCol}>
                  <Text style={styles.sectionHeading}>References</Text>
                  <View style={styles.sectionRule} />
                  <View style={styles.refGrid}>
                    {references.map((ref) => (
                      <View key={ref.id} style={styles.refItem}>
                        <Text style={styles.refName}>{ref.name}</Text>
                        {ref.title && <Text style={styles.refTitle}>{ref.title}</Text>}
                        {ref.phone && (
                          <Text style={styles.refMetaText}>
                            <Text style={styles.refMetaLabel}>T: </Text>
                            {ref.phone}
                          </Text>
                        )}
                        {ref.email && (
                          <Text style={styles.refMetaText}>
                            <Text style={styles.refMetaLabel}>E: </Text>
                            {ref.email}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {skills.length > 0 && (
                <View style={styles.footerCol}>
                  <Text style={styles.sectionHeading}>Skills</Text>
                  <View style={styles.sectionRule} />
                  {skills.map((skill, i) => (
                    <View key={i} style={styles.skillRow}>
                      <Text style={styles.skillName}>{skillName(skill)}</Text>
                      <View style={styles.skillTrack}>
                        <View style={[styles.skillFill, { width: `${skillLevel(skill)}%` }]} />
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}