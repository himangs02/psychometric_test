"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { TESTS } from "@/data";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import axios from "axios";

const selectFields = {
  gender: [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ],
};

function ResultContent({ testKey, resultDetails, score }) {
  if (!resultDetails) return null;

  if (testKey === "belbin") {
    return (
      <div className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-[#841844]/20 bg-[#841844]/5 p-5 text-center">
            <p className="text-sm text-gray-500">Primary Role</p>
            <p className="text-2xl font-bold text-[#841844]">{resultDetails.primaryRole?.name}</p>
            <p className="text-3xl font-black text-[#841844]">{resultDetails.primaryRole?.score}</p>
          </div>
          <div className="rounded-lg border border-[#841844]/20 bg-[#841844]/5 p-5 text-center">
            <p className="text-sm text-gray-500">Secondary Role</p>
            <p className="text-2xl font-bold text-[#841844]">{resultDetails.secondaryRole?.name}</p>
            <p className="text-3xl font-black text-[#841844]">{resultDetails.secondaryRole?.score}</p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed">{resultDetails.description}</p>
        <div className="rounded-lg border p-4 bg-gray-50">
          <h3 className="font-bold text-[#841844] mb-3">Complete Team Role Profile</h3>
          <div className="space-y-3">
            {resultDetails.roleDetails?.map((role, index) => (
              <div key={role.id} className={`rounded-lg border bg-white p-4 ${index < 2 ? "border-[#841844]/40" : ""}`}>
                <div className="flex justify-between gap-3 items-center">
                  <div>
                    <span className="font-semibold text-[#841844]">{index + 1}. {role.name}</span>
                    {index === 0 && <span className="ml-2 text-xs rounded-full bg-[#841844] text-white px-2 py-1">Primary</span>}
                    {index === 1 && <span className="ml-2 text-xs rounded-full bg-gray-200 text-gray-700 px-2 py-1">Secondary</span>}
                  </div>
                  <span className="font-bold">{role.score}</span>
                </div>
                <div className="grid md:grid-cols-3 gap-3 mt-3 text-sm text-gray-600">
                  <div><strong>Function:</strong> {role.function}</div>
                  <div><strong>Strength:</strong> {role.strength}</div>
                  <div><strong>Watch-out:</strong> {role.weakness}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Suggestions suggestions={resultDetails.suggestions} />
      </div>
    );
  }

  if (testKey === "mcclelland") {
    return (
      <div className="space-y-5">
        <div className="rounded-lg bg-[#841844]/5 border border-[#841844]/20 p-5 text-center">
          <p className="text-sm text-gray-500">Dominant Motivational Need</p>
          <p className="text-3xl font-black text-[#841844]">{resultDetails.dominantNeed?.name}</p>
          <p className="text-gray-600 mt-1">Secondary: {resultDetails.secondaryNeed?.name}</p>
        </div>
        <p className="text-gray-700 leading-relaxed">{resultDetails.description}</p>
        <div className="grid md:grid-cols-3 gap-4">
          {resultDetails.motivationDetails?.map((item) => (
            <div key={item.id} className="rounded-lg border bg-white p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-[#841844]">{item.name}</h3>
                <span className="font-bold">{item.score}/40</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-[#841844]" style={{ width: `${item.percentage}%` }} />
              </div>
              <p className="text-sm text-gray-600 mt-3">{item.description}</p>
            </div>
          ))}
        </div>
        <Suggestions suggestions={resultDetails.suggestions} />
      </div>
    );
  }

  if (testKey === "mbti") {
    return (
      <div className="space-y-5">
        <div className="rounded-lg bg-[#841844]/5 border border-[#841844]/20 p-6 text-center">
          <p className="text-sm text-gray-500">Your 4-Letter Personality Profile</p>
          <p className="text-6xl font-black tracking-widest text-[#841844]">{resultDetails.type}</p>
          <p className="text-xl font-semibold mt-2">{resultDetails.typeName}</p>
        </div>
        <p className="text-gray-700 leading-relaxed text-center">{resultDetails.description}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {resultDetails.dimensionScores?.map((d) => (
            <div key={d.dimension} className="rounded-lg border p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#841844]">{d.dimension}</span>
                <span className="text-sm font-semibold">Preference: {d.preference}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3 text-center">
                <div className={`rounded p-2 ${d.preference === d.left ? "bg-[#841844] text-white" : "bg-white border"}`}><div className="font-bold">{d.left}</div><div className="text-sm">{d.leftScore}</div></div>
                <div className={`rounded p-2 ${d.preference === d.right ? "bg-[#841844] text-white" : "bg-white border"}`}><div className="font-bold">{d.right}</div><div className="text-sm">{d.rightScore}</div></div>
              </div>
            </div>
          ))}
        </div>
        <Suggestions suggestions={resultDetails.suggestions} />
      </div>
    );
  }

  if (resultDetails.breakdown) {
    return (
      <div className="space-y-5">
        <div className="space-y-3">
          {resultDetails.breakdown.slice(0, 3).map((cat, index) => (
            <div key={cat.id || cat.name} className="rounded-lg border bg-gray-50 p-4 flex items-center justify-between">
              <span className="font-semibold text-[#841844]">{index + 1}. {cat.name}</span>
              <span className="font-bold">{cat.score}</span>
            </div>
          ))}
        </div>
        <p className="text-gray-700 leading-relaxed">{resultDetails.description}</p>
        <Suggestions suggestions={resultDetails.suggestions} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {typeof resultDetails === "string" ? (
        <p className="text-xl font-semibold text-[#841844] text-center">{resultDetails}</p>
      ) : (
        <>
          {score !== null && <p className="font-bold text-[#841844] text-center text-5xl">{score}</p>}
          <p className="text-gray-700 leading-relaxed text-center font-medium">{resultDetails.description}</p>
          {resultDetails.studentProfile && <InfoBox title="Student Profile" text={resultDetails.studentProfile} />}
          {resultDetails.goal && <InfoBox title="Goal" text={resultDetails.goal} />}
          <Suggestions suggestions={resultDetails.suggestions} />
        </>
      )}
    </div>
  );
}

function InfoBox({ title, text }) {
  return <div className="bg-gray-50 p-4 rounded-md border"><h4 className="font-semibold text-[#841844]">{title}</h4><p className="text-gray-700 mt-1">{text}</p></div>;
}

function Suggestions({ suggestions }) {
  if (!suggestions?.length) return null;
  return <div className="bg-orange-50 p-4 rounded-lg border border-orange-100"><h4 className="font-semibold text-[#841844] mb-2">Suggestions</h4><ul className="list-disc list-inside text-gray-700 space-y-1">{suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul></div>;
}

function SchoolSelect({ value, onChange, schools }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const filteredSchools = useMemo(() => {
    if (!value) return schools;
    return schools.filter((s) => s.toLowerCase().includes(value.toLowerCase()));
  }, [schools, value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-1 relative" ref={containerRef}>
      <Label htmlFor="school_name">University Name</Label>
      <div className="relative">
        <Input
          id="school_name"
          type="text"
          placeholder="Select or type university name"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pr-8"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setIsOpen((prev) => !prev)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
        >
          <ChevronDown className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {isOpen && filteredSchools.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1 z-50 max-h-44 overflow-y-auto rounded-md border border-[#841844]/20 bg-white p-1 shadow-lg animate-in fade-in-0 zoom-in-95">
          {filteredSchools.map((school, idx) => (
            <div
              key={idx}
              className={`px-3 py-2 text-sm rounded-md cursor-pointer transition-colors ${
                value === school
                  ? "bg-[#841844] text-white font-medium"
                  : "text-gray-800 hover:bg-[#841844]/10 hover:text-[#841844]"
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(school);
                setIsOpen(false);
              }}
            >
              {school}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ImprovedPersonalityTest() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [open, setOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [resultDetails, setResultDetails] = useState(null);
  const [schools, setSchools] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "", dob: "", class: "", gender: "", email: "", father_name: "", phone: "", school_name: "", state: "", city: "",
  });

  const test = selectedTest ? TESTS[selectedTest] : null;
  const kind = test?.kind;
  const isSpecial = ["belbin", "mcclelland", "mbti"].includes(selectedTest);
  const totalSteps = kind === "belbin" ? test.sections.length : test?.questions?.length || 0;

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const testParam = query.get("test");
    if (testParam && TESTS[testParam]) setSelectedTest(testParam);
    axios.get("/api/schools").then((res) => setSchools(res.data)).catch(console.error);
  }, []);

  const reset = () => {
    setScore(null); setAnswers([]); setCurrentIndex(0); setResultDetails(null); setFormSubmitted(false); setOpen(false);
  };

  const handleTestSelect = (val) => { setSelectedTest(val); reset(); };

  const handleStandardAnswer = (value) => {
    const updated = [...answers]; updated[currentIndex] = value; setAnswers(updated);
  };

  const handleBelbinPoint = (sectionIndex, itemIndex, value) => {
    const updated = answers.length ? answers.map((s) => [...(s || [])]) : Array.from({ length: test.sections.length }, () => Array(8).fill(0));
    updated[sectionIndex][itemIndex] = Math.max(0, Math.min(10, Number(value) || 0));
    setAnswers(updated);
  };

  const sectionTotal = kind === "belbin" ? (answers[currentIndex] || []).reduce((sum, value) => sum + Number(value || 0), 0) : 0;
  const belbinSelectedCount = kind === "belbin" ? (answers[currentIndex] || []).filter((value) => Number(value || 0) > 0).length : 0;
  const belbinSectionComplete = kind === "belbin" && sectionTotal === 10 && belbinSelectedCount >= 1 && belbinSelectedCount <= 3;

  const allAnswered = useMemo(() => {
    if (!test) return false;
    if (kind === "belbin") return answers.length === test.sections.length && answers.every((section) => section?.length === 8 && section.reduce((s, v) => s + Number(v || 0), 0) === 10);
    return answers.length === test.questions.length && answers.every((answer) => answer !== undefined && answer !== null && answer !== "");
  }, [answers, kind, test]);

  const calculateScore = async () => {
    if (!test || submitting || !allAnswered) return;
    setSubmitting(true);
    try {
      let totalScore = 0;
      let interpretation;

      if (kind === "belbin") {
        interpretation = test.score(answers);
        totalScore = interpretation.primaryRole?.score ?? 0;
      } else if (kind === "mcclelland") {
        interpretation = test.score(answers);
        totalScore = interpretation.dominantNeed?.score ?? 0;
      } else if (kind === "mbti") {
        interpretation = test.score(answers);
        totalScore = interpretation.dimensionScores.reduce((sum, item) => sum + Math.max(item.leftScore, item.rightScore), 0);
      } else if (test.categories) {
        const categoryScores = test.categories.map((category) => {
          let categorySum = 0;
          if (category.range && category.range.length === 2) {
            for (let i = category.range[0]; i <= category.range[1]; i++) {
              const val = answers[i];
              if (val !== undefined) {
                const idx = test.options.indexOf(val);
                categorySum += test.scoring[i]?.[idx] ?? idx;
              }
            }
          }
          return { ...category, score: categorySum };
        });
        totalScore = categoryScores.reduce((sum, cat) => sum + cat.score, 0);
        interpretation = test.interpret(totalScore);
        interpretation.breakdown = categoryScores.sort((a, b) => b.score - a.score);
      } else {
        totalScore = answers.reduce((sum, val, i) => {
          const idx = test.options.indexOf(val);
          return sum + (test.scoring[i]?.[idx] || 0);
        }, 0);
        interpretation = test.interpret(totalScore);
      }

      setScore(totalScore);
      setResultDetails(interpretation);
      setOpen(true);

      const payload = {
        name: userInfo.name,
        dob: userInfo.dob || null,
        course: userInfo.class,
        married: 0,
        education: "",
        religion: "not-specified",
        gender: userInfo.gender,
        email: userInfo.email,
        occupation: userInfo.father_name,
        phone: userInfo.phone,
        institution: userInfo.school_name,
        city: userInfo.city,
        state: userInfo.state,
        rural_or_urban: "not-specified",
        test_key: selectedTest,
        test_name: test.title,
        score: totalScore,
        result: interpretation,
        responses: answers,
      };

      await axios.post("/api/submit-details", payload);
    } catch (error) {
      console.error("Failed to submit result", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full mx-auto px-4 space-y-6">
      {!formSubmitted && (
        <>
          <h1 className="text-3xl font-extrabold text-[#841844]">Select a Test</h1>
          <Select onValueChange={handleTestSelect} value={selectedTest || ""}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Choose a test" /></SelectTrigger>
            <SelectContent>
              {Object.entries(TESTS).map(([key, item]) => <SelectItem key={key} value={key}>{item.title}</SelectItem>)}
            </SelectContent>
          </Select>
        </>
      )}

      {selectedTest && !formSubmitted && (
        <Card className="w-full border border-[#841844]/40 shadow-md">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-[#841844]">Fill Your Details Before Starting the Test</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ["name", "Name", "text"], ["dob", "DOB", "date"], ["class", "Department Name", "text"], ["email", "Email", "email"],
                ["father_name", "Father Name", "text"], ["phone", "Phone", "text"], ["school_name", "University Name", "text"], ["state", "State", "text"], ["city", "City", "text"]
              ].map(([key, label, type]) => (
                key === "school_name" ? (
                  <SchoolSelect
                    key={key}
                    value={userInfo.school_name}
                    onChange={(val) => setUserInfo({ ...userInfo, school_name: val })}
                    schools={schools}
                  />
                ) : (
                  <div key={key} className="space-y-1">
                    <Label htmlFor={key}>{label}</Label>
                    <Input id={key} type={type} value={userInfo[key]} onChange={(e) => setUserInfo({ ...userInfo, [key]: e.target.value })} />
                  </div>
                )
              ))}
              <div className="space-y-1"><Label>Gender</Label><Select value={userInfo.gender} onValueChange={(value) => setUserInfo({ ...userInfo, gender: value })}><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger><SelectContent>{selectFields.gender.map((opt) => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <Button className="bg-[#841844] text-white hover:bg-[#6d1337]" disabled={!userInfo.name || !userInfo.email || !userInfo.phone} onClick={() => setFormSubmitted(true)}>Start Test</Button>
          </CardContent>
        </Card>
      )}

      {selectedTest && formSubmitted && (
        <Card className="w-full border border-[#841844]/40 shadow-md">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center gap-4">
              <div><div className="text-sm text-muted-foreground">{test.title}</div><div className="text-sm font-medium">{kind === "belbin" ? `Section ${currentIndex + 1} of ${totalSteps}` : `Question ${currentIndex + 1} of ${totalSteps}`}</div></div>
              <div className="text-sm font-semibold text-[#841844]">{Math.round(((currentIndex + 1) / totalSteps) * 100)}%</div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-[#841844] transition-all" style={{ width: `${((currentIndex + 1) / totalSteps) * 100}%` }} /></div>

            {kind === "belbin" && (
              <div className="space-y-5">
                <div className="rounded-lg bg-gray-50 border p-4"><h2 className="text-lg font-bold text-[#841844]">Section {test.sections[currentIndex].label}</h2><p className="text-gray-600 mt-1">{test.sections[currentIndex].prompt}</p><p className="text-sm font-semibold mt-2">Allocate exactly 10 points across the 8 statements.</p></div>
                <div className="space-y-3">
                  {test.sections[currentIndex].items.map((item, itemIndex) => (
                    <div key={itemIndex} className="grid grid-cols-[1fr_80px] gap-3 items-center rounded-lg border p-3">
                      <div><span className="font-semibold text-[#841844] mr-2">{item.number}.</span>{item.text}</div>
                      <Input type="number" min="0" max="10" step="1" value={answers[currentIndex]?.[itemIndex] ?? 0} onChange={(e) => handleBelbinPoint(currentIndex, itemIndex, e.target.value)} className="text-center" />
                    </div>
                  ))}
                </div>
                <div className={`p-3 rounded-lg border text-center font-bold ${belbinSectionComplete ? "bg-green-50 border-green-200 text-green-700" : "bg-orange-50 border-orange-200 text-orange-700"}`}>Points allocated: {sectionTotal} / 10 · Statements selected: {belbinSelectedCount} / 3</div>
                {!belbinSectionComplete && <p className="text-sm text-orange-700">Select 1–3 statements and distribute exactly 10 points among them.</p>}
              </div>
            )}

            {kind === "mbti" && (() => {
              const question = test.questions[currentIndex];
              return <div className="space-y-4"><div className="mb-4 font-bold text-xl text-[#841844]">{question.number}. {question.prompt}</div><RadioGroup value={answers[currentIndex] || ""} onValueChange={handleStandardAnswer}>{Object.entries(question.options).map(([key, text]) => <div key={key} className="flex items-start space-x-2 w-full cursor-pointer hover:bg-gray-50 p-3 rounded"><RadioGroupItem value={key} id={`${currentIndex}-${key}`} /><Label className="w-full cursor-pointer leading-relaxed" htmlFor={`${currentIndex}-${key}`}><span className="font-semibold mr-2">{key})</span>{text}</Label></div>)}</RadioGroup></div>;
            })()}

            {kind === "mcclelland" && (
              <div className="space-y-4"><div className="mb-4 font-bold text-xl text-[#841844]">{currentIndex + 1}. {test.questions[currentIndex]}</div><RadioGroup value={answers[currentIndex] !== undefined ? String(answers[currentIndex]) : ""} onValueChange={handleStandardAnswer}>{test.options.map((opt, index) => <div key={index} className="flex items-center space-x-2 w-full cursor-pointer hover:bg-gray-50 p-2 rounded"><RadioGroupItem value={String(5 - index)} id={`${currentIndex}-${index}`} /><Label className="w-full cursor-pointer" htmlFor={`${currentIndex}-${index}`}>{opt}</Label></div>)}</RadioGroup></div>
            )}

            {!isSpecial && (
              <><div className="mb-4 font-bold text-xl text-[#841844]">{test.questions[currentIndex]}</div><RadioGroup value={answers[currentIndex] || ""} onValueChange={handleStandardAnswer}>{test.options?.map((opt, index) => <div key={index} className="flex items-center space-x-2 w-full cursor-pointer hover:bg-gray-50 p-2 rounded"><RadioGroupItem value={opt} id={`${currentIndex}-${index}`} /><Label className="w-full cursor-pointer" htmlFor={`${currentIndex}-${index}`}>{opt}</Label></div>)}</RadioGroup></>
            )}

            <div className="flex justify-between mt-6">
              <Button variant="outline" disabled={currentIndex === 0} onClick={() => setCurrentIndex(currentIndex - 1)}>Previous</Button>
              {currentIndex < totalSteps - 1 ? (
                <Button onClick={() => setCurrentIndex(currentIndex + 1)} disabled={kind === "belbin" ? !belbinSectionComplete : answers[currentIndex] === undefined || answers[currentIndex] === ""}>Next</Button>
              ) : (
                <Button className="bg-[#841844] text-white hover:bg-[#6d1337]" onClick={calculateScore} disabled={!allAnswered || submitting}>{submitting ? "Submitting..." : "Submit"}</Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-left max-w-4xl max-h-[88vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-[#841844] text-center">{test?.title} Result</DialogTitle></DialogHeader>
          <ResultContent testKey={selectedTest} resultDetails={resultDetails} score={score} />
          <div className="text-center pt-2"><Button className="bg-[#841844] hover:bg-[#6d1337] text-white" onClick={() => { setOpen(false); window.location.href = "/"; }}>Close Result</Button></div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
