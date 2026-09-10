// lib/resume/renderers/compact-ats-safe/pdf.tsx
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { RenderableResume } from "@/lib/templates/types";

// NOTE: This template assumes a few optional fields beyond what minimal-grid's
// usage of RenderableResume covers — all guarded, so this compiles even if
// they're absent from your current type:
//   - exp.location? / edu.location?: string           ("City, State" on the right)
//   - edu.bullets?: string[]                           (falls back to the single
//     `edu.highlight` field as one bullet if not provided)
//   - generated.leadershipExperience?: ExperienceEntry[]  (same shape as
//     `generated.experience` — section omitted entirely if absent)
//   - data.skillsInterestLines?: string[]              (pre-formatted lines like
//     "Computer: Google Suite, Adobe Creative Suite..."; falls back to a single
//     generated line built from skills.technical/tools/soft if not provided)
//
// Uses react-pdf's built-in Times-Roman/Bold/Italic/BoldItalic standard fonts —
// no TTF files needed for this template.

const INK = "#000000";

const styles = StyleSheet.create({
  page: {
    paddingVertical: 36,
    paddingHorizontal: 44,
    fontFamily: "Times-Roman",
    fontSize: 9.5,
    color: INK,
  },

  // Header
  name: {
    fontFamily: "Times-Roman",
    fontSize: 22,
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 4,
  },
  contactLine: { fontSize: 10, textAlign: "center", marginBottom: 14 },
  underline: { textDecoration: "underline" },

  // Section headings
  section: { marginBottom: 10 },
  sectionHeading: {
    fontFamily: "Times-Bold",
    fontSize: 10.5,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  sectionRule: { borderBottomWidth: 1.5, borderBottomColor: INK, marginBottom: 4 },

  // Entry rows
  entryHeaderRow: { flexDirection: "row", justifyContent: "space-between" },
  entryOrg: { fontFamily: "Times-Bold", fontSize: 10 },
  entryLocation: { fontFamily: "Times-Bold", fontSize: 10 },
  entrySubRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  entryRole: { fontFamily: "Times-Italic", fontSize: 9.5 },
  entryDates: { fontFamily: "Times-Italic", fontSize: 9.5 },

  bulletRow: { flexDirection: "row", marginBottom: 2, paddingLeft: 10 },
  bulletMark: { width: 12, fontSize: 9 },
  bulletText: { flex: 1, fontSize: 9.5, lineHeight: 1.4 },
  bold: { fontFamily: "Times-Bold" },

  entryBlock: { marginBottom: 6 },

  skillsLine: { fontSize: 9.5, lineHeight: 1.5, marginBottom: 2 },
});

// Renders "Label: rest of text" with the label bolded, when the text looks
// like it starts with a short label followed by a colon (as in the
// screenshot's "Relevant Coursework:" / "Computer:" style lines). Falls back
// to plain text otherwise.
function LabeledText({ text, style }: { text: string; style?: any }) {
  const match = text.match(/^([A-Za-z][A-Za-z /&-]{1,28}:)\s*(.*)$/);
  if (!match) return <Text style={style}>{text}</Text>;
  const [, label, rest] = match;
  return (
    <Text style={style}>
      <Text style={styles.bold}>{label}</Text> {rest}
    </Text>
  );
}

type ExperienceEntry = RenderableResume["generated"]["experience"][number];

function ExperienceBlock({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <>
      {entries.map((exp) => {
        const location = (exp as any).location as string | undefined;
        return (
          <View key={exp.id} style={styles.entryBlock}>
            <View style={styles.entryHeaderRow}>
              <Text style={styles.entryOrg}>{exp.company}</Text>
              {location && <Text style={styles.entryLocation}>{location}</Text>}
            </View>
            <View style={styles.entrySubRow}>
              <Text style={styles.entryRole}>{exp.role}</Text>
              <Text style={styles.entryDates}>
                {exp.startYear} - {exp.endYear}
              </Text>
            </View>
            {exp.bullets?.map((b, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletMark}>•</Text>
                <LabeledText text={b} style={styles.bulletText} />
              </View>
            ))}
          </View>
        );
      })}
    </>
  );
}

export function CompactAtsSafePdf({ data }: { data: RenderableResume }) {
  const { personal, generated } = data;

  const contactParts = [personal.address, personal.email, personal.phone].filter(Boolean);

  const leadershipExperience = (generated as any).leadershipExperience as
    | ExperienceEntry[]
    | undefined;

  const allSkills = [
    ...(generated.skills?.technical ?? []),
    ...(generated.skills?.tools ?? []),
    ...(generated.skills?.soft ?? []),
  ];
  const skillsInterestLines: string[] =
    (data as any).skillsInterestLines ??
    (allSkills.length > 0 ? [`Skills: ${allSkills.join(", ")}`] : []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.name}>{personal.fullName}</Text>
        {contactParts.length > 0 && (
          <Text style={styles.contactLine}>
            {contactParts
              .map((part, i) => (
                <Text key={i}>
                  {part === personal.email ? (
                    <Text style={styles.underline}>{part}</Text>
                  ) : (
                    part
                  )}
                  {i < contactParts.length - 1 ? "  |  " : ""}
                </Text>
              ))}
          </Text>
        )}

        {/* Education */}
        {generated.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Education</Text>
            <View style={styles.sectionRule} />
            {generated.education.map((edu) => {
              const location = (edu as any).location as string | undefined;
              const bullets: string[] = (edu as any).bullets ?? (edu.highlight ? [edu.highlight] : []);
              return (
                <View key={edu.id} style={styles.entryBlock}>
                  <View style={styles.entryHeaderRow}>
                    <Text style={styles.entryOrg}>{edu.school}</Text>
                    {location && <Text style={styles.entryLocation}>{location}</Text>}
                  </View>
                  <View style={styles.entrySubRow}>
                    <Text style={styles.entryRole}>{edu.degree}</Text>
                    <Text style={styles.entryDates}>
                      {edu.startYear} - {edu.endYear}
                    </Text>
                  </View>
                  {bullets.map((b, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <Text style={styles.bulletMark}>•</Text>
                      <LabeledText text={b} style={styles.bulletText} />
                    </View>
                  ))}
                </View>
              );
            })}
          </View>
        )}

        {/* Work Experience */}
        {generated.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Work Experience</Text>
            <View style={styles.sectionRule} />
            <ExperienceBlock entries={generated.experience} />
          </View>
        )}

        {/* Leadership Experience & Activities (optional — see NOTE) */}
        {leadershipExperience && leadershipExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Leadership Experience &amp; Activities</Text>
            <View style={styles.sectionRule} />
            <ExperienceBlock entries={leadershipExperience} />
          </View>
        )}

        {/* Skills & Interests */}
        {skillsInterestLines.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Skills &amp; Interests</Text>
            <View style={styles.sectionRule} />
            {skillsInterestLines.map((line, i) => (
              <LabeledText key={i} text={line} style={styles.skillsLine} />
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}