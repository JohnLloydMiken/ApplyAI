// lib/resume/renderers/creative-portfolio/pdf.tsx
import {
  Document,
  Page,
  View,
  Text,
  Image,
  Svg,
  Circle,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import path from "path";
import type { RenderableResume } from "@/lib/templates/types";

// NOTE: Reuses the same optional-field patterns established in earlier
// templates — both guarded, compiles fine without them:
//   - personal.jobTitle?: string    (role line under the name, e.g. "Graphic
//     & Web Designer")
//   - skills entries may be plain strings OR { name, level? } (0-100) for the
//     4-dot skill rating; defaults to 70 (≈3 dots) when no level is given
//
// Education and Experience map directly onto your existing fields — no new
// assumptions needed there. Body/label text uses react-pdf's built-in
// "Helvetica" standard font; only the display heading font needs a TTF.

Font.register({
  family: "Anton",
  fonts: [{ src: path.join(process.cwd(), "public/fonts/Anton-Regular.ttf") }],
});

const DARK = "#1E1E1E";
const ORANGE = "#F5820A";
const PAGE_BG = "#EFEFEF";
const GRAY = "#5A5A5A";
const DOT_EMPTY = "#DDDDDD";

const styles = StyleSheet.create({
  page: { flexDirection: "row", fontFamily: "Helvetica", fontSize: 9.5, color: "#333333" },

  // Sidebar
  sidebar: { width: "33%", minHeight: "100%", flexDirection: "column", backgroundColor: DARK },
  sidebarTopBlock: {
    backgroundColor: ORANGE,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  photo: { width: 145, height: 145, borderRadius: 72.5, borderWidth: 5, borderColor: DARK },
  sidebarBody: { flex: 1, padding: 20 },

  sideHeading: {
    fontFamily: "Anton",
    fontSize: 15,
    color: ORANGE,
    marginBottom: 4,
  },
  sideRule: { width: 30, borderBottomWidth: 2, borderBottomColor: "#fff", marginBottom: 10 },
  sideBlockSpacing: { marginBottom: 18 },

  contactLabel: { fontFamily: "Helvetica-Bold", fontSize: 9.5, color: "#fff", marginBottom: 2 },
  contactValue: { fontSize: 9, color: "#C9C9C9", marginBottom: 8 },

  eduDate: { fontSize: 8.5, color: "#C9C9C9", marginBottom: 1 },
  eduDegree: { fontFamily: "Helvetica-Bold", fontSize: 9.5, color: "#fff" },
  eduSchool: { fontSize: 9, color: "#C9C9C9", marginBottom: 10 },

  skillRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  skillName: { fontFamily: "Helvetica-Bold", fontSize: 9, color: "#fff" },
  dotsRow: { flexDirection: "row", gap: 3 },

  // Right column
  main: { flex: 1, minHeight: "100%", backgroundColor: PAGE_BG },
  headerLightStrip: { height: 100, backgroundColor: PAGE_BG },
  headerDarkBar: { backgroundColor: DARK, paddingHorizontal: 30, paddingVertical: 16 },
  name: { fontFamily: "Anton", fontSize: 24, color: "#fff", letterSpacing: 0.5 },
  role: { fontFamily: "Anton", fontSize: 12, color: ORANGE, marginTop: 4 },

  mainContent: { padding: 30 },
  section: { marginBottom: 22 },
  sectionHeading: { fontFamily: "Anton", fontSize: 17, color: ORANGE, marginBottom: 4 },
  sectionRule: { width: 30, borderBottomWidth: 2, borderBottomColor: DARK, marginBottom: 12 },
  paragraph: { fontSize: 9.5, lineHeight: 1.55, color: "#333333" },

  entryRow: { flexDirection: "row", gap: 16, marginBottom: 16 },
  entryDateCol: { width: "24%" },
  entryDate: { fontSize: 8.5, color: GRAY, marginBottom: 2 },
  entryOrg: { fontSize: 8.5, color: GRAY },
  entryTextCol: { flex: 1 },
  entryRole: { fontFamily: "Helvetica-Bold", fontSize: 10, color: "#1A1A1A", marginBottom: 2 },
  entryDesc: { fontSize: 9, lineHeight: 1.45, color: "#333333" },
});

type SkillEntry = string | { name: string; level?: number };
function skillName(s: SkillEntry): string {
  return typeof s === "string" ? s : s.name;
}
function skillLevel(s: SkillEntry): number {
  return typeof s === "string" ? 70 : s.level ?? 70;
}

export function CreativePortfolioPdf({ data }: { data: RenderableResume }) {
  const { personal, generated, photo } = data;

  const skills: SkillEntry[] = [
    ...(generated.skills?.technical ?? []),
    ...(generated.skills?.tools ?? []),
    ...(generated.skills?.soft ?? []),
  ] as SkillEntry[];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarTopBlock}>
            {photo && <Image src={photo} style={styles.photo} />}
          </View>

          <View style={styles.sidebarBody}>
            <View style={styles.sideBlockSpacing}>
              <Text style={styles.sideHeading}>Contact Me</Text>
              <View style={styles.sideRule} />
              {personal.phone && (
                <>
                  <Text style={styles.contactLabel}>Phone</Text>
                  <Text style={styles.contactValue}>{personal.phone}</Text>
                </>
              )}
              {personal.email && (
                <>
                  <Text style={styles.contactLabel}>Email</Text>
                  <Text style={styles.contactValue}>{personal.email}</Text>
                </>
              )}
              {personal.address && (
                <>
                  <Text style={styles.contactLabel}>Address</Text>
                  <Text style={styles.contactValue}>{personal.address}</Text>
                </>
              )}
            </View>

            {generated.education?.length > 0 && (
              <View style={styles.sideBlockSpacing}>
                <Text style={styles.sideHeading}>Education</Text>
                <View style={styles.sideRule} />
                {generated.education.map((edu) => (
                  <View key={edu.id}>
                    <Text style={styles.eduDate}>
                      {edu.startYear} - {edu.endYear}
                    </Text>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                  </View>
                ))}
              </View>
            )}

            {skills.length > 0 && (
              <View style={styles.sideBlockSpacing}>
                <Text style={styles.sideHeading}>Skills</Text>
                <View style={styles.sideRule} />
                {skills.map((skill, i) => {
                  const filled = Math.round(skillLevel(skill) / 25);
                  return (
                    <View key={i} style={styles.skillRow}>
                      <Text style={styles.skillName}>{skillName(skill)}</Text>
                      <View style={styles.dotsRow}>
                        {Array.from({ length: 4 }).map((_, di) => (
                          <Svg key={di} width="7" height="7" viewBox="0 0 24 24">
                            <Circle
                              cx="12"
                              cy="12"
                              r="10"
                              fill={di < filled ? ORANGE : DOT_EMPTY}
                            />
                          </Svg>
                        ))}
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>

        {/* Main column */}
        <View style={styles.main}>
          <View style={styles.headerLightStrip} />
          <View style={styles.headerDarkBar}>
            <Text style={styles.name}>{personal.fullName}</Text>
            {(personal as any).jobTitle && (
              <Text style={styles.role}>{(personal as any).jobTitle}</Text>
            )}
          </View>

          <View style={styles.mainContent}>
            {generated.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Profile</Text>
                <View style={styles.sectionRule} />
                <Text style={styles.paragraph}>{generated.summary}</Text>
              </View>
            )}

            {generated.experience?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Experience</Text>
                <View style={styles.sectionRule} />
                {generated.experience.map((exp) => (
                  <View key={exp.id} style={styles.entryRow}>
                    <View style={styles.entryDateCol}>
                      <Text style={styles.entryDate}>
                        {exp.startYear} - {exp.endYear}
                      </Text>
                      <Text style={styles.entryOrg}>{exp.company}</Text>
                    </View>
                    <View style={styles.entryTextCol}>
                      <Text style={styles.entryRole}>{exp.role}</Text>
                      {exp.bullets?.length > 0 && (
                        <Text style={styles.entryDesc}>{exp.bullets.join(" ")}</Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}