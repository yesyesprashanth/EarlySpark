import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Typography,
  Box,
  Card,
  CardContent, 
  FormControl,
  FormLabel,
  Divider,
  FormHelperText,
} from "@mui/material";

const screeningData = [
  {
    id: 1,
    screeningName: "Auditory",
    testList: [
      {
        disorderName: "Hearing",
        questions: [
          "Does the person hear well in a noisy environment?",
          "Does the person have trouble hearing high-pitched sounds?",
          "Does the person need to turn up the volume on TV or radio?",
        ],
      },
      {
        disorderName: "Speech",
        questions: [
          "Does the person have difficulty pronouncing words clearly?",
          "Does the person have a lisp or slurred speech?",
          "Does the person often stutter or repeat words?",
        ],
      },
      {
        disorderName: "Language",
        questions: [
          "Does the person struggle to form complete sentences?",
          "Does the person have trouble finding the right words?",
          "Does the person frequently mispronounce words?",
        ],
      },
    ],
  },
];

const ScreeningTestData = () => {
  const [formData, setFormData] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errors, setErrors] = useState({});

  const handleSelectionChange = (disorderName, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [disorderName]: value,
    }));

    if (value === "No") {
      setFormData((prevData) => {
        const newData = { ...prevData };
        delete newData[disorderName];
        return newData;
      });
    }
  };

  const handleRadioChange = (disorderName, question, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [disorderName]: {
        ...prevData[disorderName],
        [question]: value,
      },
    }));
  };

  const handleSubmit = () => {
    let formErrors = {};
    screeningData.forEach((screening) => {
      screening.testList.forEach((test) => {
        if (selectedOptions[test.disorderName] === "Yes") {
          test.questions.forEach((question) => {
            if (!formData[test.disorderName]?.[question]) {
              formErrors = {
                ...formErrors,
                [test.disorderName]: {
                  ...formErrors[test.disorderName],
                  [question]: "This question must be answered.",
                },
              };
            }
          });
        }
      });
    });

    if (Object.keys(formErrors).length === 0) {
      console.log(formData);
      alert("Form submitted successfully!");
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      {screeningData.map((screening) => (
        <Card
          key={screening.id}
          sx={{
            width: "100%",
            maxWidth: "600px",
            margin: "auto",
            marginBottom: 3,
            borderRadius: 2,
            boxShadow: 5,
            padding: 2,
            backgroundColor: "#f5f5f5",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: 3,
                color: "#1976d2",
              }}
            >
              {screening.screeningName}
            </Typography>

            {screening.testList.map((test, testIndex) => (
              <Box key={testIndex} sx={{ marginBottom: 3 }}>
                {/* Disorder Name + Yes/No on the Right */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <FormLabel sx={{ fontWeight: "bold" }}>
                    {test.disorderName}
                  </FormLabel>

                  <RadioGroup
                    row
                    value={selectedOptions[test.disorderName] || ""}
                    onChange={(e) =>
                      handleSelectionChange(test.disorderName, e.target.value)
                    }
                  >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </Box>

                {/* Questions Section (Shown Only If "Yes" Is Selected) */}
                {selectedOptions[test.disorderName] === "Yes" && (
                  <>
                    <Divider sx={{ marginBottom: 2 }} />
                    {test.questions.map((question, qIndex) => (
                      <Box
                        key={qIndex}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 1,
                        }}
                      >
                        <Typography variant="body2" sx={{ flex: 1 }}>
                          {`${qIndex + 1}. ${question}`}
                        </Typography>

                        <FormControl component="fieldset">
                          <RadioGroup
                            row
                            value={formData[test.disorderName]?.[question] || ""}
                            onChange={(e) =>
                              handleRadioChange(
                                test.disorderName,
                                question,
                                e.target.value
                              )
                            }
                          >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                          </RadioGroup>
                        </FormControl>
                        {errors[test.disorderName]?.[question] && (
                          <FormHelperText>
                            {errors[test.disorderName][question]}
                          </FormHelperText>
                        )}
                      </Box>
                    ))}
                  </>
                )}
              </Box>
            ))}
          </CardContent>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                padding: "8px 16px",
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              Submit
            </Button>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default ScreeningTestData;
