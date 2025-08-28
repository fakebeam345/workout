import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { BookOpen, Clock, Target, AlertCircle } from "lucide-react";

const ExerciseGuide = () => {
  const exercises = {
    cardio: [
      {
        name: "การวิ่งจ๊อกกิ้ง",
        duration: "20-30 นาที",
        difficulty: "ง่าย",
        calories: "200-300",
        description: "การออกกำลังกายที่ดีสำหรับหัวใจและการเผาผลาญไขมัน",
        steps: [
          "อบอุ่นร่างกายด้วยการเดินเร็ว 5 นาที",
          "เริ่มวิ่งในจังหวะที่สามารถสนทนาได้",
          "รักษาจังหวะการหายใจให้สม่ำเสมอ",
          "วิ่งต่อเนื่อง 15-20 นาที",
          "คลายร่างกายด้วยการเดินเบาๆ 5 นาที"
        ],
        tips: [
          "เริ่มต้นด้วยระยะเวลาสั้นๆ แล้วค่อยเพิ่ม",
          "สวมรองเท้าวิ่งที่เหมาะสม",
          "ดื่มน้ำเพียงพอก่อนและหลังการวิ่ง"
        ]
      },
      {
        name: "การปั่นจักรยาน",
        duration: "30-45 นาที",
        difficulty: "ง่าย-ปานกลาง",
        calories: "250-400",
        description: "การออกกำลังกายที่ดีต่อข้อเข่าและสร้างความแข็งแรงให้ขา",
        steps: [
          "ปรับความสูงของอานให้เหมาะสม",
          "อบอุ่นร่างกายด้วยการปั่นเบาๆ 5 นาที",
          "เพิ่มความเร็วหรือความต้านทานตามต้องการ",
          "รักษาท่าทางที่ถูกต้อง หลังตรง",
          "คลายร่างกายด้วยการปั่นเบาๆ 5 นาที"
        ],
        tips: [
          "เริ่มต้นด้วยความต้านทานต่ำ",
          "เปลี่ยนท่านั่งบ่อยๆ เพื่อลดการปวดเมื่อย",
          "ปั่นด้วยจังหวะที่สม่ำเสมอ"
        ]
      }
    ],
    yoga: [
      {
        name: "ท่า Mountain Pose (ตาดาสนะ)",
        duration: "2-3 นาที",
        difficulty: "ง่าย",
        calories: "5-10",
        description: "ท่าพื้นฐานที่ช่วยปรับสมดุลและจิตใจ",
        steps: [
          "ยืนตรง เท้าแนบชิดกัน",
          "กระจายน้ำหนักอย่างเท่าเทียมกันที่เท้าทั้งสอง",
          "ยืดแขนทั้งสองข้างลงตามธรรมชาติ",
          "ยืดกระดูกสันหลังขึ้น หัวตรง",
          "หายใจเข้าออกอย่างสงบ"
        ],
        tips: [
          "จินตนาการว่ามีเส้นด้ายดึงหัวขึ้นสู่ฟ้า",
          "รู้สึกถึงการสัมผัสของเท้ากับพื้น",
          "ปล่อยให้ไหล่ผ่อนคลาย"
        ]
      },
      {
        name: "ท่า Child's Pose (บาลาสนะ)",
        duration: "3-5 นาที",
        difficulty: "ง่าย",
        calories: "3-8",
        description: "ท่าพักผ่อนที่ช่วยลดความเครียดและยืดหลัง",
        steps: [
          "คุกเข่าลงบนพื้น นิ้วเท้าใหญ่แตะกัน",
          "นั่งบนส้นเท้า แล้วแยกเข่าออกเท่ากับสะโพก",
          "โน้มตัวไปข้างหน้า วางหน้าผากลงบนพื้น",
          "เหยียดแขนไปข้างหน้า หรือวางข้างลำตัว",
          "หายใจลึกๆ และผ่อนคลาย"
        ],
        tips: [
          "ใช้หมอนรองหน้าผากหากไม่สบาย",
          "อย่าฝืนถ้าเข่าหรือสะโพกตึง",
          "อยู่ในท่านี้นานเท่าที่สบาย"
        ]
      }
    ],
    bodybuilding: [
      {
        name: "Push-up (วิดพื้น)",
        duration: "3 เซ็ต x 8-15 ครั้ง",
        difficulty: "ปานกลาง",
        calories: "30-50",
        description: "สร้างความแข็งแรงให้หน้าอก ไหล่ และแขน",
        steps: [
          "นอนคว่ำ วางมือบนพื้น กว้างกว่าไหล่เล็กน้อย",
          "ยืดขาตรง ส้นเท้าแตะพื้น",
          "รักษาลำตัวให้ตรงจากหัวถึงส้นเท้า",
          "ลดตัวลงจนหน้าอกเกือบแตะพื้น",
          "ผลักตัวกลับขึ้นสู่ท่าเริ่มต้น"
        ],
        tips: [
          "หายใจเข้าตอนลงไป หายใจออกตอนผลักขึ้น",
          "อย่าให้สะโพกยุบลงหรือยกสูงเกินไป",
          "เริ่มจากข้อเข่าก่อนถ้ายังไม่แข็งแรงพอ"
        ]
      },
      {
        name: "Squat (นั่งลุกไม่มีเก้าอี้)",
        duration: "3 เซ็ต x 10-20 ครั้ง",
        difficulty: "ง่าย-ปานกลาง",
        calories: "40-60",
        description: "สร้างความแข็งแรงให้ขาและสะโพก",
        steps: [
          "ยืนตรง เท้าห่างเท่ากับไหล่",
          "ชี้นิ้วเท้าออกไปข้างนอกเล็กน้อย",
          "ลดตัวลงเหมือนนั่งเก้าอี้ สะโพกไปข้างหลัง",
          "ลงไปจนต้นขาขนานกับพื้น",
          "ลุกขึ้นสู่ท่าเริ่มต้น กดจากส้นเท้า"
        ],
        tips: [
          "เก็บน้ำหนักไว้ที่ส้นเท้า",
          "เข่าไม่ควรล้ำเข้าไปข้างใน",
          "หลังตรง อกชู"
        ]
      }
    ]
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "ง่าย": return "bg-green-100 text-green-800";
      case "ปานกลาง": return "bg-yellow-100 text-yellow-800";
      case "ยาก": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">แนะนำท่าออกกำลังกาย</h1>
          <p className="text-muted-foreground">เรียนรู้ท่าออกกำลังกายที่ถูกต้องและปลอดภัย</p>
        </div>

        <Tabs defaultValue="cardio" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cardio">Cardio</TabsTrigger>
            <TabsTrigger value="yoga">Yoga</TabsTrigger>
            <TabsTrigger value="bodybuilding">Bodybuilding</TabsTrigger>
          </TabsList>

          {Object.entries(exercises).map(([category, exerciseList]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {exerciseList.map((exercise, index) => (
                  <Card key={index} className="bg-gradient-card shadow-fitness">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getDifficultyColor(exercise.difficulty)}>
                          {exercise.difficulty}
                        </Badge>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{exercise.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            <span>{exercise.calories} kcal</span>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-6 w-6 text-primary" />
                        {exercise.name}
                      </CardTitle>
                      <CardDescription>{exercise.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          ขั้นตอนการทำ
                        </h4>
                        <ol className="space-y-2">
                          {exercise.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="text-sm flex gap-3">
                              <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                                {stepIndex + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-secondary" />
                          เคล็ดลับ
                        </h4>
                        <ul className="space-y-1">
                          {exercise.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="text-sm flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ExerciseGuide;