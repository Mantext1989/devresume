import { Resume } from "../types";
import { Page, Document, StyleSheet } from "@react-pdf/renderer";
import { BasicsSection } from "./sections/basics-section";
import { VStack } from "./stack";
import {
  AwardsSection,
  CertificatesSection,
  EducationSection,
  ProjectsSection,
  PublicationsSection,
  SkillsSection,
  VolunteerSection,
  WorkSection,
} from "./sections";
import { Theme, createTheme } from "./theme";
import { Bar } from "./bar";
import { useMemo } from "react";

type Props = {
  resume: Resume;
};

function createStyles(theme: Theme) {
  return StyleSheet.create({
    page: {
      backgroundColor: "white",
      fontFamily: "Roboto",
      paddingVertical: theme.space[10],
      paddingHorizontal: theme.space[12],
      fontSize: theme.fontSize[0],
      lineHeight: theme.lineHeight,
      color: theme.color.text,
    },
  });
}

export function ResumeDocument({ resume }: Props) {
  const {
    basics,
    work,
    skills,
    projects,
    education,
    awards,
    certificates,
    publications,
    volunteer,
    meta,
  } = resume;

  const accentColor = meta && meta.accentColor;
  const baseFontSize = meta && meta.baseFontSize;

  const theme = useMemo(
    () => createTheme(accentColor, baseFontSize),
    [accentColor, baseFontSize]
  );
  const styles = createStyles(theme);

  return (
    <Document>
      <Page style={styles.page} size="A4">
        <Bar theme={theme} />
        <VStack gap={theme.space[10]}>
          {(meta?.order || [
            "basics",
            "education",
            "skills",
            "projects",
            "work",
            "awards",
            "certificates",
            "publications",
            "volunteer",
          ]).map((section) => {
            switch (section) {
              case "basics":
                return basics && <BasicsSection key="basics" theme={theme} basics={basics} />;
              case "skills":
                return skills && Array.isArray(skills) && <SkillsSection key="skills" theme={theme} skills={skills} />;
              case "work":
                return work && Array.isArray(work) && <WorkSection key="work" theme={theme} work={work} />;
              case "projects":
                return projects && Array.isArray(projects) && <ProjectsSection key="projects" theme={theme} projects={projects} />;
              case "education":
                return education && Array.isArray(education) && <EducationSection key="education" theme={theme} education={education} />;
              case "awards":
                return awards && Array.isArray(awards) && <AwardsSection key="awards" theme={theme} awards={awards} />;
              case "certificates":
                return certificates && Array.isArray(certificates) && <CertificatesSection key="certificates" theme={theme} certificates={certificates} />;
              case "publications":
                return publications && Array.isArray(publications) && <PublicationsSection key="publications" theme={theme} publications={publications} />;
              case "volunteer":
                return volunteer && Array.isArray(volunteer) && <VolunteerSection key="volunteer" theme={theme} volunteer={volunteer} />;
              default:
                return null;
            }
          })}
        </VStack>
      </Page>
    </Document>
  );
}
