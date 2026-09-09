// lib/resume/renderers/modern-sidebar/pdf.tsx
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
// minimal-grid's usage of RenderableResume covers:
//   - data.languages?: { id: string; name: string; level?: number (0-100) }[]
//   - skills entries may be plain strings OR { name: string; level?: number }
//     (used for the "Expertise" bars — level defaults to 78 if not given)
// Both are guarded, so this compiles even if absent from your current type —
// wire them into RenderableResume / your data layer when ready.

Font.register({
  family: "Poppins",
  fonts: [
    { src: path.join(process.cwd(), "public/fonts/Poppins-Bold.ttf"), fontWeight: "bold" },
    { src: path.join(process.cwd(), "public/fonts/Poppins-Black.ttf"), fontWeight: 900 },
  ],
});
Font.register({
  family: "Jost",
  fonts: [
    { src: path.join(process.cwd(), "public/fonts/Jost-Regular.ttf"), fontWeight: "normal" },
    { src: path.join(process.cwd(), "public/fonts/Jost-Medium.ttf"), fontWeight: 500 },
  ],
});

const DARK = "#2B2C39";
const INK = "#1A1A1A";
const BODY = "#4B4B55";
const MUTED = "#8A8A93";
const TRACK = "#E3E3E7";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Jost",
    fontSize: 9.5,
    color: BODY,
  },

  // Sidebar
  sidebar: { width: "34%", minHeight: "100%", flexDirection: "column" },
  sidebarPhoto: { width: "100%", height: 220, objectFit: "cover" },
  sidebarDark: { flex: 1, backgroundColor: DARK, padding: 18 },

  name: { fontFamily: "Poppins", fontWeight: 900, fontSize: 21, color: "#fff", lineHeight: 1.05 },
  role: { fontSize: 10.5, color: "#D6D6DC", marginTop: 6, marginBottom: 8 },
  sideRule: { width: 34, borderBottomWidth: 2, borderBottomColor: "#6B6C7A", marginBottom: 10 },

  socialRow: { flexDirection: "row", gap: 8, marginBottom: 18 },

  sideHeading: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: 13,
    color: "#fff",
    marginBottom: 6,
  },
  sideBlock: { marginBottom: 18 },
  sideLabel: { fontSize: 8.5, color: "#B7B8C0", marginBottom: 1 },
  sideValue: { fontSize: 9, color: "#fff", marginBottom: 8, lineHeight: 1.35 },

  langRow: { marginBottom: 8 },
  langName: { fontSize: 9, color: "#fff", marginBottom: 3 },
  barTrack: { height: 6, backgroundColor: "#4A4B5A", width: "100%" },
  barFillLight: { height: 6, backgroundColor: "#fff" },

  // Main column
  main: { flex: 1, padding: 26 },
  section: { marginBottom: 18 },
  sectionHeading: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: 16,
    color: INK,
    marginBottom: 6,
  },
  mainRule: { width: 30, borderBottomWidth: 2, borderBottomColor: INK, marginBottom: 10 },
  paragraph: { fontSize: 9.5, lineHeight: 1.55, color: BODY },

  entryRow: { flexDirection: "row", gap: 18, marginBottom: 14 },
  entryLeftCol: { width: "34%" },
  entryRole: { fontSize: 9.5, color: INK, marginBottom: 2 },
  entryDates: { fontSize: 9, color: MUTED, marginBottom: 2 },
  entryOrg: { fontSize: 9, color: MUTED },
  entryRightCol: { flex: 1 },
  entryDesc: { fontSize: 9, lineHeight: 1.5, color: BODY },

  expertiseGrid: { flexDirection: "row", flexWrap: "wrap" },
  expertiseItem: { width: "50%", marginBottom: 10, paddingRight: 14 },
  expertiseLabel: { fontSize: 9, color: BODY, marginBottom: 4 },
  expertiseTrack: { height: 6, backgroundColor: TRACK, width: "100%" },
  expertiseFill: { height: 6, backgroundColor: DARK },
});

// --- Icons ---

function LinkedinIcon() {
  return (
    <Svg width="11" height="11" viewBox="0 0 24 24">
      <Path
        d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.83v2.05h.06c.53-1 1.85-2.05 3.8-2.05C19.7 8 21 10.1 21 13.9V23h-4v-8.2c0-1.96-.04-4.48-2.73-4.48-2.73 0-3.15 2.13-3.15 4.33V23h-4V8z"
        fill="#fff"
      />
    </Svg>
  );
}

function TwitterIcon() {
  return (
    <Svg width="12" height="10" viewBox="0 0 24 20">
      <Path
        d="M24 2.4c-.88.4-1.83.66-2.83.78a4.93 4.93 0 002.16-2.72c-.95.57-2 .98-3.13 1.2A4.92 4.92 0 0013.85 6.6c0 .39.04.76.13 1.12A13.96 13.96 0 011.67 1.15a4.92 4.92 0 001.52 6.56 4.88 4.88 0 01-2.23-.62v.06a4.93 4.93 0 003.95 4.83c-.46.13-.95.2-1.45.2-.35 0-.7-.03-1.03-.1a4.94 4.94 0 004.6 3.42A9.87 9.87 0 010 17.5a13.94 13.94 0 007.55 2.21c9.05 0 14-7.5 14-14 0-.21 0-.42-.02-.63A9.93 9.93 0 0024 2.4z"
        fill="#fff"
      />
    </Svg>
  );
}

function FacebookIcon() {
  return (
    <Svg width="9" height="11" viewBox="0 0 12 24">
      <Path
        d="M11 0H8.5C6 0 4.3 1.7 4.3 4.3V7H1.8v3.6h2.5V24h3.9V10.6h2.7L11 7H8.2V4.7c0-.75.4-1.15 1.2-1.15H11V0z"
        fill="#fff"
      />
    </Svg>
  );
}

function LinkIcon() {
  return (
    <Svg width="10" height="10" viewBox="0 0 24 24">
      <Path
        d="M3.9 12a4.1 4.1 0 014.1-4.1h4V6H8a6 6 0 000 12h4v-1.9H8A4.1 4.1 0 013.9 12zM9 13h6v-2H9v2zm7-7h-4v1.9h4A4.1 4.1 0 0120.1 12 4.1 4.1 0 0116 16.1h-4V18h4a6 6 0 000-12z"
        fill="#fff"
      />
    </Svg>
  );
}

function socialIconFor(url: string) {
  const u = url.toLowerCase();
  if (u.includes("linkedin")) return <LinkedinIcon />;
  if (u.includes("twitter") || u.includes("x.com")) return <TwitterIcon />;
  if (u.includes("facebook")) return <FacebookIcon />;
  return <LinkIcon />;
}

// --- Helpers ---

type SkillEntry = string | { name: string; level?: number };

function skillName(s: SkillEntry): string {
  return typeof s === "string" ? s : s.name;
}
function skillLevel(s: SkillEntry): number {
  return typeof s === "string" ? 78 : s.level ?? 78;
}

export function ModernSidebarPdf({ data }: { data: RenderableResume }) {
  const { personal, generated, photo } = data;

  const expertise: SkillEntry[] = [
    ...(generated.skills?.technical ?? []),
    ...(generated.skills?.tools ?? []),
  ].slice(0, 4) as SkillEntry[];

  // Optional field — see NOTE at top of file.
  const languages = (data as any).languages as
    | { id: string; name: string; level?: number }[]
    | undefined;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {photo && <Image src={photo} style={styles.sidebarPhoto} />}

          <View style={styles.sidebarDark}>
            <Text style={styles.name}>{personal.fullName}</Text>
            {(personal as any).jobTitle && (
              <Text style={styles.role}>{(personal as any).jobTitle}</Text>
            )}
            <View style={styles.sideRule} />

            {personal.links && personal.links.length > 0 && (
              <View style={styles.socialRow}>
                {personal.links.slice(0, 4).map((link) => (
                  <View key={link.id}>{socialIconFor(link.url)}</View>
                ))}
              </View>
            )}

            <View style={styles.sideBlock}>
              <Text style={styles.sideHeading}>Contact</Text>
              <View style={styles.sideRule} />
              {personal.email && (
                <>
                  <Text style={styles.sideLabel}>Email:</Text>
                  <Text style={styles.sideValue}>{personal.email}</Text>
                </>
              )}
              {personal.phone && (
                <>
                  <Text style={styles.sideLabel}>Phone:</Text>
                  <Text style={styles.sideValue}>{personal.phone}</Text>
                </>
              )}
              {personal.address && (
                <>
                  <Text style={styles.sideLabel}>Address:</Text>
                  <Text style={styles.sideValue}>{personal.address}</Text>
                </>
              )}
            </View>

            {languages && languages.length > 0 && (
              <View style={styles.sideBlock}>
                <Text style={styles.sideHeading}>Languages</Text>
                <View style={styles.sideRule} />
                {languages.map((lang) => (
                  <View key={lang.id} style={styles.langRow}>
                    <Text style={styles.langName}>{lang.name}</Text>
                    <View style={styles.barTrack}>
                      <View
                        style={[styles.barFillLight, { width: `${lang.level ?? 70}%` }]}
                      />
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Main column */}
        <View style={styles.main}>
          {generated.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Profile</Text>
              <View style={styles.mainRule} />
              <Text style={styles.paragraph}>{generated.summary}</Text>
            </View>
          )}

          {generated.experience?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Experience</Text>
              <View style={styles.mainRule} />
              {generated.experience.map((exp) => (
                <View key={exp.id} style={styles.entryRow}>
                  <View style={styles.entryLeftCol}>
                    <Text style={styles.entryRole}>{exp.role}</Text>
                    <Text style={styles.entryDates}>
                      {exp.startYear} - {exp.endYear}
                    </Text>
                    <Text style={styles.entryOrg}>{exp.company}</Text>
                  </View>
                  <View style={styles.entryRightCol}>
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

          {generated.education?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Education</Text>
              <View style={styles.mainRule} />
              {generated.education.map((edu) => (
                <View key={edu.id} style={styles.entryRow}>
                  <View style={styles.entryLeftCol}>
                    <Text style={styles.entryRole}>{edu.school}</Text>
                    <Text style={styles.entryDates}>
                      {edu.startYear} - {edu.endYear}
                    </Text>
                    <Text style={styles.entryOrg}>{edu.degree}</Text>
                  </View>
                  <View style={styles.entryRightCol}>
                    {edu.highlight && <Text style={styles.entryDesc}>{edu.highlight}</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}

          {expertise.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Expertise</Text>
              <View style={styles.mainRule} />
              <View style={styles.expertiseGrid}>
                {expertise.map((skill, i) => (
                  <View key={i} style={styles.expertiseItem}>
                    <Text style={styles.expertiseLabel}>{skillName(skill)}</Text>
                    <View style={styles.expertiseTrack}>
                      <View
                        style={[styles.expertiseFill, { width: `${skillLevel(skill)}%` }]}
                      />
                    </View>
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