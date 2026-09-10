// lib/resume/renderers/two-col-balanced/pdf.tsx
import {
  Document,
  Page,
  View,
  Text,
  Svg,
  Path,
  Circle,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import path from "path";
import type { RenderableResume } from "@/lib/templates/types";

// NOTE: This template assumes several optional fields beyond what
// minimal-grid's usage of RenderableResume covers — all guarded, so this
// compiles even if they're absent from your current type:
//   - personal.jobTitle?: string
//   - exp.location?: string
//   - exp.companyDescription?: string      (one-line blurb above the bullets)
//   - data.strengths?: { id, icon?, title, description }[]
//   - data.achievements?: { id, icon?, title, description }[]   ("Most Proud Of")
//     icon accepts: "star" | "thumbsUp" | "people" | "paw" (falls back to a dot)
//   - data.personalValues?: string[]
//   - data.languages?: { id, name, level }[]    (level 0-100, shown as 5 dots)
//
// Body/meta text uses react-pdf's built-in "Helvetica" standard font family
// (no TTF needed). Only the heading font below needs a font file.

Font.register({
  family: "Poppins",
  fonts: [
    { src: path.join(process.cwd(), "public/fonts/Poppins-Bold.ttf"), fontWeight: "bold" },
    { src: path.join(process.cwd(), "public/fonts/Poppins-SemiBold.ttf"), fontWeight: 600 },
  ],
});

const INK = "#1E1E1E";
const GRAY = "#6B6B6B";
const LIGHT_LINE = "#DDDDDD";
const WAVE = "#ECECEC";
const DOT_FILLED = "#3A3A3A";
const DOT_EMPTY = "#DEDEDE";

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9.5, color: "#333333" },

  headerWrap: { position: "relative", paddingHorizontal: 34, paddingTop: 30 },
  wavesLayer: { position: "absolute", top: 0, left: 0, right: 0, height: 190 },

  name: { fontFamily: "Poppins", fontWeight: "bold", fontSize: 26, color: INK, marginBottom: 2 },
  role: { fontFamily: "Poppins", fontWeight: 600, fontSize: 12, color: GRAY, marginBottom: 10 },
  contactRow: { flexDirection: "row", gap: 24, marginBottom: 4 },
  contactItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  contactText: { fontFamily: "Helvetica-Bold", fontSize: 9, color: INK },

  body: { flexDirection: "row", paddingHorizontal: 34, paddingBottom: 30, marginTop: 20, gap: 22 },
  mainCol: { width: "60%" },
  sideCol: { width: "40%" },

  section: { marginBottom: 16 },
  sectionHeading: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: 12.5,
    color: INK,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  sectionRule: { borderBottomWidth: 2, borderBottomColor: INK, marginBottom: 10 },
  paragraph: { fontSize: 9.5, lineHeight: 1.5, color: "#333333" },

  // Experience entries
  entryBlock: { marginBottom: 10, paddingBottom: 10 },
  entryDivider: { borderBottomWidth: 1, borderBottomStyle: "dashed", borderBottomColor: LIGHT_LINE },
  entryRole: { fontSize: 11, color: INK, marginBottom: 2 },
  entryCompany: { fontFamily: "Helvetica-Bold", fontSize: 9.5, color: GRAY, marginBottom: 3 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 5 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 8.5, color: GRAY },
  companyDesc: { fontSize: 9, lineHeight: 1.45, color: "#333333", marginBottom: 5 },
  bulletRow: { flexDirection: "row", marginBottom: 2 },
  bulletMark: { width: 10, fontSize: 8 },
  bulletText: { flex: 1, fontSize: 9, lineHeight: 1.45, color: "#333333" },

  // Strengths / Most Proud Of
  cardRow: { flexDirection: "row", gap: 8, marginBottom: 10, paddingBottom: 10 },
  cardDivider: { borderBottomWidth: 1, borderBottomStyle: "dashed", borderBottomColor: LIGHT_LINE },
  cardIconCol: { width: 16, paddingTop: 1 },
  cardTextCol: { flex: 1 },
  cardTitle: { fontFamily: "Helvetica-Bold", fontSize: 9.5, color: INK, marginBottom: 2 },
  cardDesc: { fontSize: 8.5, lineHeight: 1.4, color: GRAY },

  // Personal Values
  valuesRow: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  valueTag: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: INK,
    paddingBottom: 3,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_LINE,
  },

  // Languages
  langBlock: { marginBottom: 8, paddingBottom: 8 },
  langDivider: { borderBottomWidth: 1, borderBottomStyle: "dashed", borderBottomColor: LIGHT_LINE },
  langRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  langName: { fontFamily: "Helvetica-Bold", fontSize: 9.5, color: INK },
  dotsRow: { flexDirection: "row", gap: 4 },
});

// --- Icons ---

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
        fill={GRAY}
      />
    </Svg>
  );
}
function StarIcon() {
  return (
    <Svg width="13" height="13" viewBox="0 0 24 24">
      <Path
        d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.1l-6.1 3.5 1.4-6.8L2.2 9.1l6.9-.8L12 2z"
        fill={INK}
      />
    </Svg>
  );
}
function ThumbsUpIcon() {
  return (
    <Svg width="13" height="13" viewBox="0 0 24 24">
      <Path
        d="M2 21h3V10H2v11zM22 11c0-1.1-.9-2-2-2h-6.3l.9-4.5.03-.5c0-.4-.16-.77-.44-1.04L12.83 2 7.4 7.4C7.15 7.66 7 8.02 7 8.41V19a2 2 0 002 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z"
        fill={INK}
      />
    </Svg>
  );
}
function PeopleIcon() {
  return (
    <Svg width="13" height="13" viewBox="0 0 24 24">
      <Path
        d="M9 12a4 4 0 100-8 4 4 0 000 8zm-1 2c-3.3 0-6 1.7-6 4v2h9v-2c0-.7.15-1.37.43-1.97C10.34 14.4 8.7 14 8 14zm9-2a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm0 2c-.5 0-1.8.15-3 .68 1.4 1 2 2.4 2 3.32v2h6v-2c0-2.3-2.7-4-5-4z"
        fill={INK}
      />
    </Svg>
  );
}
function PawIcon() {
  return (
    <Svg width="13" height="13" viewBox="0 0 24 24">
      <Path
        d="M5.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM9.5 6a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM14.5 6a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM12 11c-3 0-6.5 2.3-6.5 5.4C5.5 19 7.6 20 9.5 19c.9-.5 1.6-.5 2.5-.5s1.6 0 2.5.5c1.9 1 4-.1 4-3.6C18.5 13.3 15 11 12 11z"
        fill={INK}
      />
    </Svg>
  );
}
function DotFallbackIcon() {
  return (
    <Svg width="10" height="10" viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="8" fill={INK} />
    </Svg>
  );
}
function cardIconFor(key?: string) {
  switch (key) {
    case "star":
      return <StarIcon />;
    case "thumbsUp":
      return <ThumbsUpIcon />;
    case "people":
      return <PeopleIcon />;
    case "paw":
      return <PawIcon />;
    default:
      return <DotFallbackIcon />;
  }
}

// Soft decorative wave/blob background for the header area.
function HeaderWaves() {
  return (
    <Svg width="100%" height="190" viewBox="0 0 600 190" style={styles.wavesLayer}>
      <Path
        d="M0 0h600v70c-90 40-180-30-280 0-90 27-160 70-320 40V0z"
        fill={WAVE}
      />
      <Circle cx="560" cy="30" r="55" stroke="#E0E0E0" strokeWidth={1} fill="none" />
      <Path d="M420 0c60 20 100 55 180 40v-40H420z" fill="#F2F2F2" />
    </Svg>
  );
}

export function TwoColBalancedPdf({ data }: { data: RenderableResume }) {
  const { personal, generated } = data;

  const linkedin = personal.links?.find((l) => l.url.toLowerCase().includes("linkedin"));

  const strengths = (data as any).strengths as
    | { id: string; icon?: string; title: string; description: string }[]
    | undefined;
  const achievements = (data as any).achievements as
    | { id: string; icon?: string; title: string; description: string }[]
    | undefined;
  const personalValues = (data as any).personalValues as string[] | undefined;
  const languages = (data as any).languages as
    | { id: string; name: string; level?: number }[]
    | undefined;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerWrap}>
          <HeaderWaves />
          <Text style={styles.name}>{personal.fullName}</Text>
          {(personal as any).jobTitle && (
            <Text style={styles.role}>{(personal as any).jobTitle}</Text>
          )}
          <View style={styles.contactRow}>
            {personal.phone && (
              <View style={styles.contactItem}>
                <PhoneIcon />
                <Text style={styles.contactText}>{personal.phone}</Text>
              </View>
            )}
            {personal.email && (
              <View style={styles.contactItem}>
                <MailIcon />
                <Text style={styles.contactText}>{personal.email}</Text>
              </View>
            )}
            {linkedin && (
              <View style={styles.contactItem}>
                <LinkIcon />
                <Text style={styles.contactText}>{linkedin.url}</Text>
              </View>
            )}
          </View>
          {personal.address && (
            <View style={styles.contactRow}>
              <View style={styles.contactItem}>
                <PinIcon />
                <Text style={styles.contactText}>{personal.address}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Body: two columns */}
        <View style={styles.body}>
          {/* Main column */}
          <View style={styles.mainCol}>
            {generated.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Summary</Text>
                <View style={styles.sectionRule} />
                <Text style={styles.paragraph}>{generated.summary}</Text>
              </View>
            )}

            {generated.experience?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Entrepreneurial Experience</Text>
                <View style={styles.sectionRule} />
                {generated.experience.map((exp, idx) => {
                  const location = (exp as any).location as string | undefined;
                  const companyDescription = (exp as any).companyDescription as
                    | string
                    | undefined;
                  const isLast = idx === generated.experience.length - 1;
                  return (
                    <View
                      key={exp.id}
                      style={[styles.entryBlock, !isLast ? styles.entryDivider : {}]}
                    >
                      <Text style={styles.entryRole}>{exp.role}</Text>
                      <Text style={styles.entryCompany}>{exp.company}</Text>
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
                      {companyDescription && (
                        <Text style={styles.companyDesc}>{companyDescription}</Text>
                      )}
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
          </View>

          {/* Sidebar column */}
          <View style={styles.sideCol}>
            {strengths && strengths.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Strengths</Text>
                <View style={styles.sectionRule} />
                {strengths.map((s, i) => {
                  const isLast = i === strengths.length - 1;
                  return (
                    <View
                      key={s.id}
                      style={[styles.cardRow, !isLast ? styles.cardDivider : {}]}
                    >
                      <View style={styles.cardIconCol}>{cardIconFor(s.icon)}</View>
                      <View style={styles.cardTextCol}>
                        <Text style={styles.cardTitle}>{s.title}</Text>
                        <Text style={styles.cardDesc}>{s.description}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            {achievements && achievements.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Most Proud Of</Text>
                <View style={styles.sectionRule} />
                {achievements.map((a, i) => {
                  const isLast = i === achievements.length - 1;
                  return (
                    <View
                      key={a.id}
                      style={[styles.cardRow, !isLast ? styles.cardDivider : {}]}
                    >
                      <View style={styles.cardIconCol}>{cardIconFor(a.icon)}</View>
                      <View style={styles.cardTextCol}>
                        <Text style={styles.cardTitle}>{a.title}</Text>
                        <Text style={styles.cardDesc}>{a.description}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            {personalValues && personalValues.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Personal Values</Text>
                <View style={styles.sectionRule} />
                <View style={styles.valuesRow}>
                  {personalValues.map((v, i) => (
                    <Text key={i} style={styles.valueTag}>
                      {v}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {languages && languages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Languages</Text>
                <View style={styles.sectionRule} />
                {languages.map((lang, i) => {
                  const isLast = i === languages.length - 1;
                  const filled = Math.round((lang.level ?? 60) / 20);
                  return (
                    <View
                      key={lang.id}
                      style={[styles.langBlock, !isLast ? styles.langDivider : {}]}
                    >
                      <View style={styles.langRow}>
                        <Text style={styles.langName}>{lang.name}</Text>
                        <View style={styles.dotsRow}>
                          {Array.from({ length: 5 }).map((_, di) => (
                            <Svg key={di} width="8" height="8" viewBox="0 0 24 24">
                              <Circle
                                cx="12"
                                cy="12"
                                r="10"
                                fill={di < filled ? DOT_FILLED : DOT_EMPTY}
                              />
                            </Svg>
                          ))}
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}