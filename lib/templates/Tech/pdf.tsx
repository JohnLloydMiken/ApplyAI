// lib/resume/renderers/tech-dev/pdf.tsx
import { Document, Page, View, Text, Image, StyleSheet, Font } from "@react-pdf/renderer";
import path from "path";
import type { RenderableResume } from "@/lib/templates/types";

// NOTE: This template assumes a few optional fields beyond what minimal-grid's
// usage of RenderableResume covers — all guarded, so this compiles even if
// they're absent from your current type:
//   - personal.roles?: string[]                 (role tags under the name;
//     falls back to personal.jobTitle if only one role is available)
//   - exp.summary?: string                       (one-line blurb above the
//     bullet list for a job — omitted if not provided)
//   - generated.certifications?: { id, name, issuer, date? }[]
//
// Body text uses react-pdf's built-in "Helvetica" standard font, so no TTF
// file is needed for that part — only the name/heading font below.

Font.register({
  family: "Playfair Display",
  fonts: [
    { src: path.join(process.cwd(), "public/fonts/PlayfairDisplay-Bold.ttf"), fontWeight: "bold" },
  ],
});

const NAVY = "#1F3B6E";
const INK = "#1A1A1A";
const BODY = "#333333";
const MUTED = "#555555";

const styles = StyleSheet.create({
  page: {
    padding: 34,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: BODY,
  },

  // Header
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 14 },
  headerTextCol: { alignItems: "center" },
  photo: { width: 54, height: 54, borderRadius: 27, objectFit: "cover" },
  name: {
    fontFamily: "Playfair Display",
    fontWeight: "bold",
    fontSize: 25,
    color: NAVY,
    textAlign: "center",
    marginBottom: 4,
  },
  rolesText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: NAVY,
    textAlign: "center",
    marginBottom: 8,
  },
  headerRule: { borderBottomWidth: 1, borderBottomColor: NAVY, marginBottom: 6 },
  contactText: {
    fontSize: 8.5,
    color: MUTED,
    textAlign: "center",
    marginBottom: 12,
  },

  // Sections
  section: { marginBottom: 12 },
  sectionHeading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    color: NAVY,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  sectionRule: { borderBottomWidth: 1, borderBottomColor: NAVY, marginBottom: 6 },
  paragraph: { fontSize: 9.5, lineHeight: 1.5, color: BODY },

  expertiseText: {
    fontSize: 9,
    lineHeight: 1.6,
    color: BODY,
    textAlign: "center",
  },

  // Experience entries
  expBlock: { marginBottom: 10 },
  expHeaderRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  expTitleText: { fontFamily: "Helvetica-Bold", fontSize: 9.5, color: INK },
  expDateText: { fontSize: 9, color: MUTED },
  expSummary: { fontSize: 9, lineHeight: 1.45, color: BODY, marginBottom: 4 },

  bulletRow: { flexDirection: "row", marginBottom: 2, paddingLeft: 6 },
  bulletMark: { width: 10, fontSize: 8 },
  bulletText: { flex: 1, fontSize: 9, lineHeight: 1.45, color: BODY },

  // Education / certification rows
  eduRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  eduTitleText: { fontFamily: "Helvetica-Bold", fontSize: 9.5, color: INK },
  eduSubText: { fontFamily: "Helvetica", fontSize: 9.5, color: BODY },
  eduDateText: { fontSize: 9, color: MUTED },
});

export function TechDevPdf({ data }: { data: RenderableResume }) {
  const { personal, generated, photo } = data;

  const roles: string[] | undefined = (personal as any).roles;
  const rolesLine = roles?.length
    ? roles.join("  |  ")
    : (personal as any).jobTitle ?? undefined;

  const linkedin = personal.links?.find((l) => l.url.toLowerCase().includes("linkedin"));

  const contactParts = [
    personal.phone,
    personal.email,
    personal.address,
    linkedin?.url,
  ].filter(Boolean);

  const allSkills = [
    ...(generated.skills?.technical ?? []),
    ...(generated.skills?.tools ?? []),
    ...(generated.skills?.soft ?? []),
  ];

  const certifications = (generated as any).certifications as
    | { id: string; name: string; issuer?: string; date?: string }[]
    | undefined;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          {photo && <Image src={photo} style={styles.photo} />}
          <View style={styles.headerTextCol}>
            <Text style={styles.name}>{personal.fullName}</Text>
            {rolesLine && <Text style={styles.rolesText}>{rolesLine}</Text>}
          </View>
        </View>
        <View style={styles.headerRule} />
        {contactParts.length > 0 && (
          <Text style={styles.contactText}>{contactParts.join("   |   ")}</Text>
        )}

        {/* Professional Summary */}
        {generated.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Professional Summary</Text>
            <View style={styles.sectionRule} />
            <Text style={styles.paragraph}>{generated.summary}</Text>

            {allSkills.length > 0 && (
              <View style={{ marginTop: 8 }}>
                <Text style={[styles.sectionHeading, { textAlign: "center", fontSize: 9.5 }]}>
                  Areas of Expertise
                </Text>
                <Text style={styles.expertiseText}>{allSkills.join("  -  ")}</Text>
              </View>
            )}
          </View>
        )}

        {/* Professional Experience */}
        {generated.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Professional Experience</Text>
            <View style={styles.sectionRule} />
            {generated.experience.map((exp) => {
              const location = (exp as any).location as string | undefined;
              const summary = (exp as any).summary as string | undefined;
              return (
                <View key={exp.id} style={styles.expBlock}>
                  <View style={styles.expHeaderRow}>
                    <Text style={styles.expTitleText}>
                      {exp.role} | {exp.company}
                      {location ? `, ${location}` : ""}
                    </Text>
                    <Text style={styles.expDateText}>
                      {exp.startYear} – {exp.endYear}
                    </Text>
                  </View>
                  {summary && <Text style={styles.expSummary}>{summary}</Text>}
                  {exp.bullets?.map((b, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <Text style={styles.bulletMark}>•</Text>
                      <Text style={styles.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              );
            })}
          </View>
        )}

        {/* Education & Certifications */}
        {(generated.education?.length > 0 || (certifications && certifications.length > 0)) && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Education &amp; Certifications</Text>
            <View style={styles.sectionRule} />
            {generated.education?.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <Text>
                  <Text style={styles.eduTitleText}>{edu.degree}</Text>
                  <Text style={styles.eduSubText}> | {edu.school}</Text>
                </Text>
                <Text style={styles.eduDateText}>
                  {edu.startYear} – {edu.endYear}
                </Text>
              </View>
            ))}
            {certifications?.map((cert) => (
              <View key={cert.id} style={styles.eduRow}>
                <Text>
                  <Text style={styles.eduTitleText}>{cert.name}</Text>
                  {cert.issuer && <Text style={styles.eduSubText}> | {cert.issuer}</Text>}
                </Text>
                {cert.date && <Text style={styles.eduDateText}>{cert.date}</Text>}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}