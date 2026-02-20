import React, { useEffect, useState } from "react";
import {
  Textarea,
  Group,
  NumberInput,
  Select,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { set } from "react-hook-form";

const QuestionPage = () => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const courseOutcomes = [
        { value: "CO1", label: "CO1" },
        { value: "CO2", label: "CO2" },
        { value: "CO3", label: "CO3" },
        { value: "CO4", label: "CO4" },
        { value: "CO5", label: "CO5" },
    ];
       const bloom = [
        { value: "K1", label: "K1" },
        { value: "K2", label: "K2" },
        { value: "K3", label: "K3" },
        { value: "K4", label: "K4" },
        { value: "K5", label: "K5" },
        { value: "K6", label: "K6" },
    ];

  
  const examStructure: any = {
    UNIT_TEST: { A: 5, B: 3, C: 2 },
    MID_SEM: { A: 7, B: 4, C: 6 },
    PRE_UNIVERSITY: { A: 7, B: 5, C: 7 },
  };

  const examType: any = {
    UNIT_TEST: "Unit Test",
    MID_SEM: "Mid Semester",
    PRE_UNIVERSITY: "Pre University",
  };
   const courseType: any = {
    BTECH_CSE: "B.Tech Computer Science",
    BCA: "BCA",
    MBA: "MBA",
  };


  const maxMarks: any = {
    UNIT_TEST: 30,
    MID_SEM: 50,
    PRE_UNIVERSITY: 70,
  };

  const courseData: any = {
    BTECH_CSE: {
      years: ["1", "2", "3", "4"],
      subjects: {
        "1": ["Mathematics I", "Physics", "Basic Electrical"],
        "2": ["DSA", "DBMS", "COA"],
        "3": ["DAA", "Operating Systems", "Software Engineering"],
        "4": ["Machine Learning", "Cloud Computing", "Blockchain"],
      },
    },

    BCA: {
      years: ["1", "2", "3"],
      subjects: {
        "1": ["C Programming", "Digital Logic"],
        "2": ["Java", "Computer Networks"],
        "3": ["Python", "Web Development"],
      },
    },

    MBA: {
      years: ["1", "2"],
      subjects: {
        "1": ["Management Principles", "Accounting"],
        "2": ["Marketing", "HR Management"],
      },
    },
  };

 
  const form = useForm({
    initialValues: {
      course: "",
      year: "",
      subjectName: "",
      type: "",
      questions: {},
    },
  });



  
  useEffect(() => {
    form.setFieldValue("year", "");
    form.setFieldValue("subjectName", "");
    form.setFieldValue("type", "");
    form.setFieldValue("questions", {});
  }, [form.values.course]);

  
  useEffect(() => {
    form.setFieldValue("subjectName", "");
    form.setFieldValue("type", "");
    form.setFieldValue("questions", {});
  }, [form.values.year]);

  
  useEffect(() => {
    form.setFieldValue("type", "");
    form.setFieldValue("questions", {});
  }, [form.values.subjectName]);

 
  useEffect(() => {
    if (!form.values.type) return;

    const structure = examStructure[form.values.type];
    const newQuestions: any = {};

    Object.entries(structure).forEach(([section, count]: any) => {
      newQuestions[section] = Array.from({ length: count }).map(() => ({
          questionText: "",
          marks: 0,
          bloomsLevel: "",
          courseOutcome: "",
      }));
    });

    form.setFieldValue("questions", newQuestions);
  }, [form.values.type]);

  
  const handleSubmit = (values: typeof form.values) => {
    generatePDF(values);
  };
const generatePDF = (values: typeof form.values) => {
  const doc = new jsPDF();

  let totalMarks = 0;

  // HEADER
  const logoUrl = "/srms.png";
  doc.addImage(logoUrl, "PNG", 15, 10, 25, 25);

  doc.setFontSize(14);
  doc.text(
    `SRMS CET BAREILLY ${examType[values.type]} Examination`,
    105,
    18,
    { align: "center" }
  );

  doc.setFontSize(12);
  doc.text(examType[values.type], 105, 25, { align: "center" });

  doc.setFontSize(11);
  doc.text(
    `Course: ${courseType[values.course]}   Year: ${values.year}`,
    105,
    32,
    { align: "center" }
  );

  doc.text(
    `Subject: ${values.subjectName}   Exam Type: ${
      examType[values.type]
    }   Max Marks: ${maxMarks[values.type]}`,
    105,
    38,
    { align: "center" }
  );

  doc.line(10, 45, 200, 45);

  let startY = 50;

  Object.entries(values.questions).forEach(
    ([sectionName, questions]: any) => {
      doc.setFontSize(13);
      doc.text(`Section ${sectionName}`, 14, startY);
      startY += 6;

      autoTable(doc, {
        startY: startY,
        head: [["Question", "Marks", "Bloom", "CO"]],
        body: questions.map((q: any) => {
          totalMarks += Number(q.marks || 0);
          return [
            q.questionText || "-",
            q.marks || "-",
            q.bloomsLevel || "-",
            q.courseOutcome || "-",
          ];
        }),
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [31, 173, 159] },
        columnStyles: {
          0: { cellWidth: 130 },
          1: { cellWidth: 15 },
          2: { cellWidth: 15 },
          3: { cellWidth: 15 },
        },
      });

      startY = (doc as any).lastAutoTable.finalY + 10;
    }
  );

  doc.setFontSize(12);
//   doc.text(`Total Marks: ${totalMarks}`, 150, startY);


  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Page ${i} of ${pageCount}`, 105, 290, {
      align: "center",
    });
  }

  const blob = doc.output("blob");
  const url = URL.createObjectURL(blob);
  setPdfUrl(url);
};
  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="w-full max-w-7xl min-h-screen rounded-2xl bg-white p-8 shadow-lg flex flex-col gap-6">

        <h1 className="text-2xl font-semibold text-primary-500">
          Question Paper Generation
        </h1>

        <form onSubmit={form.onSubmit(handleSubmit)}>

          
          <Select
            mt="md"
            label="Select Course"
            placeholder="Choose course"
            data={[
              { value: "BTECH_CSE", label: "B.Tech Computer Science" },
              { value: "BCA", label: "BCA" },
              { value: "MBA", label: "MBA" },
            ]}
            searchable
            {...form.getInputProps("course")}
          />

          
          <Select
            mt="md"
            label="Select Year"
            placeholder="Choose year"
            data={
              form.values.course
                ? courseData[form.values.course].years.map((y: string) => ({
                    value: y,
                    label: `${y} Year`,
                  }))
                : []
            }
            disabled={!form.values.course}
            {...form.getInputProps("year")}
          />

          
          <Select
            mt="md"
            label="Select Subject"
            placeholder="Choose subject"
            data={
              form.values.course && form.values.year
                ? courseData[form.values.course].subjects[
                    form.values.year
                  ].map((sub: string) => ({
                    value: sub,
                    label: sub,
                  }))
                : []
            }
            disabled={!form.values.year}
            searchable
            {...form.getInputProps("subjectName")}
          />

         
          <Select
            mt="md"
            label="Select Exam Type"
            placeholder="Choose exam type"
            data={[
              { value: "UNIT_TEST", label: "Unit Test" },
              { value: "MID_SEM", label: "Mid Semester" },
              { value: "PRE_UNIVERSITY", label: "Pre University" },
            ]}
            disabled={!form.values.subjectName}
            {...form.getInputProps("type")}
          />
            
          <Select
            mt="md"
            label="Max Marks"
            placeholder="Choose max marks"
            data={
             [
                { value: "UNIT_TEST", label: "30" },
                { value: "MID_SEM", label: "50" },
                { value: "PRE_UNIVERSITY", label: "70" },
             ]
            }
            disabled={!form.values.type}
            searchable
            {...form.getInputProps("maxMarks")}
          />

          
          {form.values.type &&
            Object.entries(form.values.questions).map(
              ([sectionName, questions]: any) => (
                <div key={sectionName} className="mt-6">
                  <h2 className="text-lg font-semibold text-primary-500">
                    Section {sectionName}
                  </h2>

                  {questions.map((_: any, index: number) => (
                    <Group key={index} mt="sm" align="flex-start">

                      <Textarea
                        style={{ flex: 6}}
                        label={`Question ${index + 1}`}
                        placeholder="Enter question"
                        {...form.getInputProps(
                          `questions.${sectionName}.${index}.questionText`
                        )}
                      />

                      <NumberInput
                        
                        label="Marks"
                        w={90}
                        {...form.getInputProps(
                          `questions.${sectionName}.${index}.marks`
                        )}
                      />

                      <Select
                        style={{ flex: 1 }}
                        label="Bloom's Level"
                        data={bloom}
                        w={90}
                        {...form.getInputProps(
                          `questions.${sectionName}.${index}.bloomsLevel`
                        )}
                      />

                      <Select
                        style={{ flex: 1 }}
                        label="Course Outcome"
                        data={courseOutcomes}
                        w={90}
                        {...form.getInputProps(
                          `questions.${sectionName}.${index}.courseOutcome`
                        )}
                      />

                    </Group>
                  ))}
                </div>
              )
            )}

          <Button mt="xl" fullWidth type="submit" color="#1fad9f">
            Generate Question Paper
          </Button>
        </form>
                {pdfUrl && (
          <div className="mt-8">
            <iframe
              src={pdfUrl}
              width="100%"
              height="600px"
              title="PDF Preview"
              className="border rounded-lg"
            />
        
            <Button
              mt="md"
              onClick={() => {
                const link = document.createElement("a");
                link.href = pdfUrl;
                link.download = "Question-Paper.pdf";
                link.click();
              }}
            >
              Download PDF
            </Button>
            <Button
              mt="md"
              ml="md"
              onClick={() => {
               setPdfUrl(null);
              }}
            >
              close This Tab
            </Button>
          </div>
)}
      </div>
    </div>
  );
};

export default QuestionPage; 