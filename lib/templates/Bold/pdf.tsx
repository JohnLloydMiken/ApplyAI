// lib/resume/renderers/bold-header/pdf.tsx
import {
  Document,
  Page,
  View,
  Text,
  Image,
  Svg,
  Path,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import path from "path";
import type { RenderableResume } from "@/lib/templates/types";

// NOTE: This template assumes a couple of optional fields beyond what
// minimal-grid's usage of RenderableResume covers — both guarded:
//   - personal.jobTitle?: string       (subtitle under the name, e.g. "Lawyer")
//   - exp.location?: string            (e.g. "Dallas, TX" next to the dates)
//
// Body/meta text uses react-pdf's built-in "Helvetica" standard font family
// (no TTF needed). Only the serif display font below needs a font file.

Font.register({
  family: "Playfair Display",
  fonts: [
    { src: path.join(process.cwd(), "public/fonts/PlayfairDisplay-Regular.ttf"), fontWeight: "normal" },
    { src: path.join(process.cwd(), "public/fonts/PlayfairDisplay-Bold.ttf"), fontWeight: "bold" },
    { src: path.join(process.cwd(), "public/fonts/PlayfairDisplay-Black.ttf"), fontWeight: 900 },
  ],
});

const INK = "#111111";
const GRAY = "#555555";
const LIGHT_GRAY = "#777777";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: INK,
  },

  // Header
  headerRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  headerLeft: { flex: 1, paddingRight: 16 },
  name: {
    fontFamily: "Playfair Display",
    fontWeight: 900,
    fontSize: 30,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: INK,
    marginBottom: 2,
  },
  jobTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: GRAY,
    marginBottom: 8,
  },
  contactGrid: { flexDirection: "row", gap: 24 },
  contactCol: { gap: 3 },
  contactItem: { flexDirection: "row", alignItems: "center", gap: 5, marginBottom: 2 },
  contactText: { fontFamily: "Helvetica-Bold", fontSize: 9, color: INK },
  photo: { width: 90, height: 90, objectFit: "cover" },

  // Sections
  section: { marginBottom: 14 },
  sectionHeading: {
    fontFamily: "Playfair Display",
    fontWeight: "bold",
    fontSize: 15,
    textTransform: "uppercase",
    color: INK,
    marginBottom: 3,
  },
  sectionRule: { borderBottomWidth: 2, borderBottomColor: INK, marginBottom: 8 },
  paragraph: { fontSize: 9.5, lineHeight: 1.5, color: "#222222" },

  // Experience / education entries
  entryBlock: { marginBottom: 10, paddingBottom: 8 },
  entryDivider: { borderBottomWidth: 1, borderBottomStyle: "dashed", borderBottomColor: "#CCCCCC" },
  entryTitle: {
    fontFamily: "Playfair Display",
    fontWeight: "normal",
    fontSize: 12.5,
    color: INK,
    marginBottom: 2,
  },
  entryOrg: { fontFamily: "Helvetica-Bold", fontSize: 9.5, color: GRAY, marginBottom: 3 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 5 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 8.5, color: LIGHT_GRAY },

  bulletRow: { flexDirection: "row", marginBottom: 2 },
  bulletMark: { width: 10, fontSize: 8 },
  bulletText: { flex: 1, fontSize: 9, lineHeight: 1.45, color: "#222222" },
});

// --- Small inline icons ---

function PhoneIcon() {
  return (
    <Svg width="9" height="9" viewBox="0 0 24 24">
      <Path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
        fill={INK}
      />
    </Svg>
  );
}

function LinkIcon() {
  return (
    <Svg width="9" height="9" viewBox="0 0 24 24">
      <Path
        d="M3.9 12a4.1 4.1 0 014.1-4.1h4V6H8a6 6 0 000 12h4v-1.9H8A4.1 4.1 0 013.9 12zM9 13h6v-2H9v2zm7-7h-4v1.9h4A4.1 4.1 0 0120.1 12 4.1 4.1 0 0116 16.1h-4V18h4a6 6 0 000-12z"
        fill={INK}
      />
    </Svg>
  );
}

function MailIcon() {
  return (
    <Svg width="10" height="8" viewBox="0 0 24 20">
      <Path
        d="M2 2h20c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm0 2v.3l10 6.7 10-6.7V4H2zm20 2.2l-9.4 6.3c-.4.2-.8.2-1.2 0L2 6.2V18h20V6.2z"
        fill={INK}
      />
    </Svg>
  );
}

function PinIcon() {
  return (
    <Svg width="8" height="10" viewBox="0 0 24 32">
      <Path
        d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12zm0 16.5c-2.5 0-4.5-2-4.5-4.5S9.5 7.5 12 7.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5z"
        fill={INK}
      />
    </Svg>
  );
}

function CalendarIcon() {
  return (
    <Svg width="9" height="9" viewBox="0 0 24 24">
      <Path
        d="M7 2v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-2V2h-2v2H9V2H7zM5 9h14v9H5V9z"
        fill={LIGHT_GRAY}
      />
    </Svg>
  );
}

// --- Helpers ---

type ExperienceEntry = RenderableResume["generated"]["experience"][number];

export function BoldHeaderPdf({ data }: { data: RenderableResume }) {
  const { personal, generated, photo } = data;

  const linkedin = personal.links?.find((l) => l.url.toLowerCase().includes("linkedin"));

  const allSkills = [
    ...(generated.skills?.technical ?? []),
    ...(generated.skills?.tools ?? []),
    ...(generated.skills?.soft ?? []),
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{personal.fullName}</Text>
            {(personal as any).jobTitle && (
              <Text style={styles.jobTitle}>{(personal as any).jobTitle}</Text>
            )}
            <View style={styles.contactGrid}>
              <View style={styles.contactCol}>
                {personal.phone && (
                  <View style={styles.contactItem}>
                    <PhoneIcon />
                    <Text style={styles.contactText}>{personal.phone}</Text>
                  </View>
                )}
                {linkedin && (
                  <View style={styles.contactItem}>
                    <LinkIcon />
                    <Text style={styles.contactText}>{linkedin.url}</Text>
                  </View>
                )}
              </View>
              <View style={styles.contactCol}>
                {personal.email && (
                  <View style={styles.contactItem}>
                    <MailIcon />
                    <Text style={styles.contactText}>{personal.email}</Text>
                  </View>
                )}
                {personal.address && (
                  <View style={styles.contactItem}>
                    <PinIcon />
                    <Text style={styles.contactText}>{personal.address}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          {photo && <Image src={photo} style={styles.photo} />}
        </View>

        {/* Profile */}
        {generated.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Profile</Text>
            <View style={styles.sectionRule} />
            <Text style={styles.paragraph}>{generated.summary}</Text>
          </View>
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Skills</Text>
            <View style={styles.sectionRule} />
            <Text style={styles.paragraph}>{allSkills.join(", ")}</Text>
          </View>
        )}

        {/* Experience */}
        {generated.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Experience</Text>
            <View style={styles.sectionRule} />
            {generated.experience.map((exp, idx) => {
              const location = (exp as any).location as string | undefined;
              const isLast = idx === generated.experience.length - 1;
              return (
                <View
                  key={exp.id}
                  style={[styles.entryBlock, !isLast ? styles.entryDivider : {}]}
                >
                  <Text style={styles.entryTitle}>{exp.role}</Text>
                  <Text style={styles.entryOrg}>{exp.company}</Text>
                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <CalendarIcon />
                      <Text style={styles.metaText}>
                        {exp.startYear} - {exp.endYear}
                      </Text>
                    </View>
                    {location && (
                      <View style={styles.metaItem}>
                        <PinIcon />
                        <Text style={styles.metaText}>{location}</Text>
                      </View>
                    )}
                  </View>
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

        {/* Education */}
        {generated.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Education</Text>
            <View style={styles.sectionRule} />
            {generated.education.map((edu, idx) => {
              const isLast = idx === generated.education.length - 1;
              return (
                <View
                  key={edu.id}
                  style={[styles.entryBlock, !isLast ? styles.entryDivider : {}]}
                >
                  <Text style={styles.entryTitle}>{edu.degree}</Text>
                  <Text style={styles.entryOrg}>{edu.school}</Text>
                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <CalendarIcon />
                      <Text style={styles.metaText}>
                        {edu.startYear} - {edu.endYear}
                      </Text>
                    </View>
                  </View>
                  {edu.highlight && (
                    <View style={styles.bulletRow}>
                      <Text style={styles.bulletMark}>•</Text>
                      <Text style={styles.bulletText}>{edu.highlight}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}
      </Page>
    </Document>
  );
}