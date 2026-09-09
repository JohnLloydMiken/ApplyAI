// lib/resume/renderers/classic/pdf.tsx
import {
  Document,
  Page,
  View,
  Text,
  Svg,
  Path,
  Circle,
  Link,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import path from "path";
import type { RenderableResume } from "@/lib/templates/types";

// NOTE: This template assumes a couple of optional fields that aren't in the
// minimal-grid example's usage of RenderableResume:
//   - personal.jobTitle?: string          (subtitle under the name, e.g. "HEAD MANAGER")
//   - data.references?: { id, name, title, phone?, social? }[]
// Both are guarded below (rendered only if present), so this compiles fine
// even if those fields don't exist yet — add them to RenderableResume /
// your data layer when ready.

Font.register({
  family: "Poppins",
  fonts: [
    { src: path.join(process.cwd(), "public/fonts/Poppins-Regular.ttf"), fontWeight: "normal" },
    { src: path.join(process.cwd(), "public/fonts/Poppins-SemiBold.ttf"), fontWeight: 600 },
    { src: path.join(process.cwd(), "public/fonts/Poppins-ExtraBold.ttf"), fontWeight: 800 },
  ],
});

const NAVY = "#1B2A49";
const BODY = "#3F4756";
const MUTED = "#6B7280";
const LINE = "#1B2A49";

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontFamily: "Poppins",
    fontSize: 9.5,
    color: BODY,
  },
  frame: {
    flex: 1,
    borderWidth: 1.25,
    borderColor: NAVY,
    padding: 28,
  },

  // Header
  name: {
    fontSize: 30,
    fontWeight: 800,
    letterSpacing: 1,
    color: NAVY,
    textAlign: "center",
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "normal",
    letterSpacing: 3,
    color: MUTED,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 14,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: LINE,
    marginBottom: 14,
  },

  // Contact row
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 28,
    marginBottom: 14,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  contactText: {
    fontSize: 9,
    color: BODY,
  },

  // Sections
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: 0.5,
    color: NAVY,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  sectionRule: {
    borderBottomWidth: 1,
    borderBottomColor: LINE,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: BODY,
  },

  // Education / Experience rows
  entryRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 10,
  },
  entryDateCol: { width: "24%" },
  entryDate: { fontSize: 9.5, fontWeight: 600, color: NAVY, marginBottom: 2 },
  entryOrg: { fontSize: 9, color: MUTED },
  entryDetailCol: { flex: 1 },
  entryTitle: { fontSize: 10.5, fontWeight: 600, color: NAVY, marginBottom: 2 },
  entryDesc: { fontSize: 9, lineHeight: 1.45, color: BODY },

  // Skills grid
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillsCol: {
    width: "25%",
    marginBottom: 4,
  },
  skillItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
    marginBottom: 4,
  },
  skillDot: { fontSize: 9, color: NAVY },
  skillText: { fontSize: 9, color: BODY },

  // References
  refGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  refCol: { width: "50%", marginBottom: 10, paddingRight: 12 },
  refName: { fontSize: 10.5, fontWeight: 600, color: NAVY, marginBottom: 1 },
  refTitle: { fontSize: 9, color: MUTED, marginBottom: 4 },
  refMetaRow: { flexDirection: "row", gap: 3, marginBottom: 1 },
  refLabel: { fontSize: 9, fontWeight: 600, color: NAVY },
  refValue: { fontSize: 9, color: BODY },

  link: { color: BODY, textDecoration: "none" },
});

// --- Small inline icons (kept minimal, single-color, stroke-free) ---

function PhoneIcon() {
  return (
    <Svg width="10" height="10" viewBox="0 0 24 24">
      <Path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
        fill={NAVY}
      />
    </Svg>
  );
}

function PinIcon() {
  return (
    <Svg width="9" height="12" viewBox="0 0 24 32">
      <Path
        d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12zm0 16.5c-2.5 0-4.5-2-4.5-4.5S9.5 7.5 12 7.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5z"
        fill={NAVY}
      />
    </Svg>
  );
}

function MailIcon() {
  return (
    <Svg width="11" height="9" viewBox="0 0 24 20">
      <Path
        d="M2 2h20c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm0 2v.3l10 6.7 10-6.7V4H2zm20 2.2l-9.4 6.3c-.4.2-.8.2-1.2 0L2 6.2V18h20V6.2z"
        fill={NAVY}
      />
    </Svg>
  );
}

// --- Helpers ---

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

export function ClassicPdf({ data }: { data: RenderableResume }) {
  const { personal, generated } = data;

  const allSkills = [
    ...(generated.skills?.technical ?? []),
    ...(generated.skills?.tools ?? []),
    ...(generated.skills?.soft ?? []),
  ];
  const skillColumns = chunk(allSkills, Math.ceil(allSkills.length / 4) || 1);

  // Optional field — see NOTE at top of file.
  const references = (data as any).references as
    | { id: string; name: string; title?: string; phone?: string; social?: string }[]
    | undefined;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.frame}>
          {/* Header */}
          <Text style={styles.name}>{personal.fullName}</Text>
          {(personal as any).jobTitle && (
            <Text style={styles.jobTitle}>{(personal as any).jobTitle}</Text>
          )}
          <View style={styles.divider} />

          {/* Contact row */}
          <View style={styles.contactRow}>
            {personal.phone && (
              <View style={styles.contactItem}>
                <PhoneIcon />
                <Text style={styles.contactText}>{personal.phone}</Text>
              </View>
            )}
            {personal.address && (
              <View style={styles.contactItem}>
                <PinIcon />
                <Text style={styles.contactText}>{personal.address}</Text>
              </View>
            )}
            {personal.email && (
              <View style={styles.contactItem}>
                <MailIcon />
                <Text style={styles.contactText}>{personal.email}</Text>
              </View>
            )}
          </View>
          <View style={styles.divider} />

          {/* About Me */}
          {generated.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About Me</Text>
              <View style={styles.sectionRule} />
              <Text style={styles.paragraph}>{generated.summary}</Text>
            </View>
          )}

          {/* Education */}
          {generated.education?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              <View style={styles.sectionRule} />
              {generated.education.map((edu) => (
                <View key={edu.id} style={styles.entryRow}>
                  <View style={styles.entryDateCol}>
                    <Text style={styles.entryDate}>
                      {edu.startYear} - {edu.endYear}
                    </Text>
                    <Text style={styles.entryOrg}>{edu.school}</Text>
                  </View>
                  <View style={styles.entryDetailCol}>
                    <Text style={styles.entryTitle}>{edu.degree}</Text>
                    {edu.highlight && <Text style={styles.entryDesc}>{edu.highlight}</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Experience */}
          {generated.experience?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              <View style={styles.sectionRule} />
              {generated.experience.map((exp) => (
                <View key={exp.id} style={styles.entryRow}>
                  <View style={styles.entryDateCol}>
                    <Text style={styles.entryDate}>
                      {exp.startYear} - {exp.endYear}
                    </Text>
                    <Text style={styles.entryOrg}>{exp.company}</Text>
                  </View>
                  <View style={styles.entryDetailCol}>
                    <Text style={styles.entryTitle}>{exp.role}</Text>
                    {exp.bullets?.map((b, i) => (
                      <Text key={i} style={styles.entryDesc}>
                        {b}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {allSkills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.sectionRule} />
              <View style={styles.skillsGrid}>
                {skillColumns.map((col, ci) => (
                  <View key={ci} style={styles.skillsCol}>
                    {col.map((skill, si) => (
                      <View key={si} style={styles.skillItem}>
                        <Text style={styles.skillDot}>•</Text>
                        <Text style={styles.skillText}>{skill}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* References (optional — see NOTE at top of file) */}
          {references && references.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>References</Text>
              <View style={styles.sectionRule} />
              <View style={styles.refGrid}>
                {references.map((ref) => (
                  <View key={ref.id} style={styles.refCol}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    {ref.title && <Text style={styles.refTitle}>{ref.title}</Text>}
                    {ref.phone && (
                      <View style={styles.refMetaRow}>
                        <Text style={styles.refLabel}>Phone:</Text>
                        <Text style={styles.refValue}>{ref.phone}</Text>
                      </View>
                    )}
                    {ref.social && (
                      <View style={styles.refMetaRow}>
                        <Text style={styles.refLabel}>Social:</Text>
                        <Text style={styles.refValue}>{ref.social}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}