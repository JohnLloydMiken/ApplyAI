// lib/resume/renderers/minimal-grid/pdf.tsx
import {
  Document,
  Page,
  View,
  Text,
  Image,
  Link,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import path from "path";
import type { RenderableResume } from "@/lib/templates/types";

Font.register({
  family: "Lora",
  fonts: [
    { src: path.join(process.cwd(), "public/fonts/Lora-Regular.ttf") },
    { src: path.join(process.cwd(), "public/fonts/Lora-Bold.ttf"), fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: { padding: 32, fontFamily: "Lora", fontSize: 10, color: "#1a1a1a" },
  headerRow: { flexDirection: "row", gap: 16, marginBottom: 12 },
  photo: { width: 110, height: 130, objectFit: "cover" },
  name: { fontSize: 22, fontWeight: "bold", lineHeight: 1.1, marginBottom: 6 },
  metaRow: { flexDirection: "row", gap: 4, marginBottom: 2 },
  divider: { borderBottomWidth: 1, borderBottomColor: "#1a1a1a", marginVertical: 10 },
  columns: { flexDirection: "row", gap: 16 },
  col: { flex: 1 },
  vDivider: { width: 1, backgroundColor: "#1a1a1a" },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
    paddingBottom: 2,
  },
  block: { marginBottom: 14 },
  bullet: { flexDirection: "row", marginBottom: 3 },
  bulletDot: { width: 8 },
  link: { color: "#1a1a1a", textDecoration: "underline" },
});

export function MinimalGridPdf({ data }: { data: RenderableResume }) {
  const { photo, personal, generated } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          {photo && <Image src={photo} style={styles.photo} />}
          <View>
            <Text style={styles.name}>{personal.fullName}</Text>
            {personal.age && <Text style={styles.metaRow}>{personal.age} Years Old</Text>}
            {personal.dateOfBirth && <Text style={styles.metaRow}>{personal.dateOfBirth}</Text>}
            {personal.nationality && <Text style={styles.metaRow}>{personal.nationality}</Text>}
            {personal.address && <Text style={styles.metaRow}>{personal.address}</Text>}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Contacts</Text>
          {personal.phone && <Text>Phone: {personal.phone}</Text>}
          {personal.email && <Text>Email: {personal.email}</Text>}
          {personal.links?.map((link) => (
            <Link key={link.id} src={link.url} style={styles.link}>
              {link.label}: {link.url}
            </Link>
          ))}
        </View>

        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text>{generated.summary}</Text>
        </View>

        <View style={styles.columns}>
          <View style={styles.col}>
            <View style={styles.block}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {generated.experience.map((exp) => (
                <View key={exp.id} style={{ marginBottom: 8 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {exp.role} — {exp.company}
                  </Text>
                  <Text style={{ fontSize: 8, color: "#666" }}>
                    {exp.startYear} – {exp.endYear}
                  </Text>
                  {exp.bullets.map((b, i) => (
                    <View key={i} style={styles.bullet}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={{ flex: 1 }}>{b}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>

          <View style={styles.vDivider} />

          <View style={styles.col}>
            <View style={styles.block}>
              <Text style={styles.sectionTitle}>Education</Text>
              {generated.education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 6 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {edu.degree} — {edu.school}
                  </Text>
                  <Text style={{ fontSize: 8, color: "#666" }}>
                    {edu.startYear} – {edu.endYear}
                  </Text>
                  {edu.highlight && <Text>{edu.highlight}</Text>}
                </View>
              ))}
            </View>

            <View style={styles.block}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {generated.skills.technical.length > 0 && (
                <Text>Technical: {generated.skills.technical.join(", ")}</Text>
              )}
              {generated.skills.tools.length > 0 && (
                <Text>Tools: {generated.skills.tools.join(", ")}</Text>
              )}
              {generated.skills.soft.length > 0 && (
                <Text>Soft skills: {generated.skills.soft.join(", ")}</Text>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}