import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { Zap, Clock, Heart, Brain, CheckCircle } from "lucide-react";

const Yoga = () => {
  const [completedPoses, setCompletedPoses] = useState<string[]>([]);
  const [currentSession, setCurrentSession] = useState({
    poses: [] as string[],
    duration: 0,
    startTime: null as Date | null,
  });
  const { toast } = useToast();

  const yogaPoses = [
    {
      id: "mountain",
      name: "Mountain Pose (ตาดาสนะ)",
      sanskrit: "Tadasana",
      duration: "2-3 นาที",
      difficulty: "ง่าย",
      benefits: ["ปรับสมดุล", "จิตใจสงบ", "ท่าทางที่ดี"],
      description: "ท่าพื้นฐานที่สำคัญที่สุดใน Yoga",
      instructions: [
        "ยืนตรง เท้าแนบชิดกัน หรือเว้นระยะเท่าสะโพก",
        "กระจายน้ำหนักอย่างเท่าเทียมกันที่เท้าทั้งสอง",
        "ยืดขาตรง กล้ามเนื้อต้นขาตึง",
        "ยืดกระดูกสันหลังขึ้น ปล่อยไหล่ลง",
        "หายใจเข้าออกอย่างสงบ จิตใจสบาย"
      ]
    },
    {
      id: "child",
      name: "Child's Pose (บาลาสนะ)",
      sanskrit: "Balasana",
      duration: "3-5 นาที",
      difficulty: "ง่าย",
      benefits: ["ผ่อนคลาย", "ยืดหลัง", "ลดความเครียด"],
      description: "ท่าพักผ่อนที่ช่วยสร้างความสงบให้จิตใจ",
      instructions: [
        "คุกเข่าลงบนพื้น นิ้วเท้าใหญ่แตะกัน",
        "นั่งบนส้นเท้า แล้วแยกเข่าออกเท่ากับสะโพก",
        "โน้มตัวไปข้างหน้า วางหน้าผากลงบนพื้น",
        "เหยียดแขนไปข้างหน้า หรือวางข้างลำตัว",
        "หายใจลึกๆ และปล่อยให้ร่างกายผ่อนคลาย"
      ]
    },
    {
      id: "downward-dog",
      name: "Downward Facing Dog (อโธมุขศวานาสนะ)",
      sanskrit: "Adho Mukha Svanasana",
      duration: "1-3 นาที",
      difficulty: "ปานกลาง",
      benefits: ["ยืดหลัง", "เสริมแขน", "ไหลเวียนเลือด"],
      description: "ท่าคลาสสิกที่ยืดและเสริมสร้างความแข็งแรง",
      instructions: [
        "เริ่มจากท่าคลาน มือและเข่าแตะพื้น",
        "วางมือห่างจากไหล่ นิ้วกว้าง",
        "งับนิ้วเท้า ยกสะโพกขึ้นสูง",
        "ยืดขาตรง ส้นเท้าลงพื้น (ถ้าทำได้)",
        "สร้างรูป V กลับหัว หายใจสม่ำเสมอ"
      ]
    },
    {
      id: "warrior1",
      name: "Warrior I (วีรภัทราสนะ 1)",
      sanskrit: "Virabhadrasana I",
      duration: "1-2 นาที แต่ละข้าง",
      difficulty: "ปานกลาง",
      benefits: ["ความแข็งแรงขา", "สมดุล", "ความมั่นใจ"],
      description: "ท่าที่สร้างความแข็งแรงและความมั่นคง",
      instructions: [
        "ยืนห่างเท้า กว้างประมาณ 3-4 ฟุต",
        "หันเท้าขวาไปข้างหน้า เท้าซ้ายเฉียงออก 45 องศา",
        "งอเข่าขวา 90 องศา ต้นขาขนานพื้น",
        "ยกแขนขึ้นเหนือหัว ฝ่ามือแนบกัน",
        "ยืดกระดูกสันหลัง หายใจลึก"
      ]
    },
    {
      id: "tree",
      name: "Tree Pose (วฤกษาสนะ)",
      sanskrit: "Vrikshasana",
      duration: "1-2 นาที แต่ละข้าง",
      difficulty: "ปานกลาง",
      benefits: ["สมดุล", "สมาธิ", "ความแข็งแรงขา"],
      description: "ท่าสมดุลที่ช่วยฝึกสมาธิ",
      instructions: [
        "ยืนบนขาซ้าย น้ำหนักกระจายเท่ากัน",
        "งอเข่าขวา วางฝ่าเท้าขวาที่ต้นขาซ้าย",
        "หลีกเลี่ยงการวางเท้าที่เข่า",
        "ประสานมือที่หน้าอก หรือยกเหนือหัว",
        "จ้องมองจุดคงที่ หายใจสม่ำเสมอ"
      ]
    },
    {
      id: "cobra",
      name: "Cobra Pose (ภุชงคาสนะ)",
      sanskrit: "Bhujangasana",
      duration: "30 วินาที - 1 นาที",
      difficulty: "ง่าย-ปานกลาง",
      benefits: ["ยืดหน้าอก", "เสริมหลัง", "เพิ่มความยืดหยุ่น"],
      description: "ท่าโค้งหลังที่เปิดหน้าอกและเสริมสร้างหลัง",
      instructions: [
        "นอนคว่ำ หน้าผากลงพื้น",
        "วางฝ่ามือใต้ไหล่ ข้อศอกชิดลำตัว",
        "กดฝ่ามือ ยกหน้าอกขึ้นเบาๆ",
        "เก็บสะโพกแนบพื้น ไม่ใช้แรงมือมาก",
        "ยืดคอเบาๆ หายใจลึก"
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "ง่าย": return "bg-green-100 text-green-800";
      case "ปานกลาง": return "bg-yellow-100 text-yellow-800";
      case "ยาก": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const togglePoseCompletion = (poseId: string) => {
    setCompletedPoses(prev => 
      prev.includes(poseId) 
        ? prev.filter(id => id !== poseId)
        : [...prev, poseId]
    );

    if (!completedPoses.includes(poseId)) {
      setCurrentSession(prev => ({
        ...prev,
        poses: [...prev.poses, poseId],
        startTime: prev.startTime || new Date()
      }));
    }
  };

  const finishSession = () => {
    if (completedPoses.length === 0) {
      toast({
        title: "ไม่สามารถบันทึกได้",
        description: "กรุณาทำท่า Yoga อย่างน้อย 1 ท่า",
        variant: "destructive",
      });
      return;
    }

    const sessionDuration = currentSession.startTime 
      ? Math.round((new Date().getTime() - currentSession.startTime.getTime()) / 60000)
      : completedPoses.length * 3; // Estimate 3 minutes per pose

    const workout = {
      id: Date.now(),
      username: JSON.parse(localStorage.getItem("user") || "{}")?.username || "user",
      date: new Date().toISOString().split('T')[0],
      workoutType: "yoga",
      bodyPart: "full-body",
      duration: sessionDuration.toString(),
      calories: Math.round(completedPoses.length * 15).toString(), // Estimate 15 calories per pose
      notes: `Yoga session: ${completedPoses.length} ท่า - ${completedPoses.map(id => yogaPoses.find(p => p.id === id)?.name).join(', ')}`,
    };

    const existingWorkouts = JSON.parse(localStorage.getItem("workouts") || "[]");
    existingWorkouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(existingWorkouts));

    toast({
      title: "บันทึกสำเร็จ!",
      description: `บันทึกการฝึก Yoga ${completedPoses.length} ท่า`,
    });

    // Reset session
    setCompletedPoses([]);
    setCurrentSession({ poses: [], duration: 0, startTime: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Zap className="h-8 w-8 text-purple-500" />
            Yoga Practice
          </h1>
          <p className="text-muted-foreground">ฝึกโยคะเพื่อความยืดหยุ่น สมดุล และจิตใจที่สงบ</p>
        </div>

        {/* Session Progress */}
        {completedPoses.length > 0 && (
          <Card className="bg-gradient-secondary text-secondary-foreground shadow-fitness mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">เซสชั่นปัจจุบัน</h3>
                  <p>ทำท่าแล้ว {completedPoses.length} ท่า</p>
                  <p className="text-sm opacity-90">ประมาณ {Math.round(completedPoses.length * 15)} แคลอรี่</p>
                </div>
                <Button 
                  onClick={finishSession}
                  className="bg-white text-secondary hover:bg-white/90"
                >
                  จบเซสชั่น
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Yoga Poses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {yogaPoses.map((pose) => (
            <Card 
              key={pose.id} 
              className={`bg-gradient-card shadow-fitness hover:shadow-xl transition-all duration-300 ${
                completedPoses.includes(pose.id) ? 'ring-2 ring-primary' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getDifficultyColor(pose.difficulty)}>
                    {pose.difficulty}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{pose.duration}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{pose.name}</CardTitle>
                <p className="text-sm text-muted-foreground font-medium">{pose.sanskrit}</p>
                <CardDescription>{pose.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Benefits */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2 text-sm">ประโยชน์:</h4>
                  <div className="flex flex-wrap gap-1">
                    {pose.benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2 text-sm">วิธีทำ:</h4>
                  <ol className="text-xs space-y-1 text-muted-foreground">
                    {pose.instructions.slice(0, 3).map((instruction, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="bg-primary/20 text-primary rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                    {pose.instructions.length > 3 && (
                      <li className="text-muted-foreground">... และอีก {pose.instructions.length - 3} ขั้นตอน</li>
                    )}
                  </ol>
                </div>

                <Button
                  onClick={() => togglePoseCompletion(pose.id)}
                  className={`w-full ${
                    completedPoses.includes(pose.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {completedPoses.includes(pose.id) ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      เสร็จแล้ว
                    </>
                  ) : (
                    'เริ่มทำท่านี้'
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Yoga Benefits */}
        <Card className="bg-gradient-card shadow-fitness mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              ประโยชน์ของการฝึกโยคะ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  ร่างกาย
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• เพิ่มความยืดหยุ่น</li>
                  <li>• ปรับปรุงท่าทาง</li>
                  <li>• เสริมสร้างความแข็งแรง</li>
                  <li>• ลดอาการปวดหลัง</li>
                  <li>• ปรับปรุงการไหลเวียนเลือด</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  จิตใจ
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• ลดความเครียด</li>
                  <li>• เพิ่มสมาธิ</li>
                  <li>• สร้างความสงบใจ</li>
                  <li>• ปรับปรุงอารมณ์</li>
                  <li>• เพิ่มการตระหนักรู้</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  วิถีชีวิต
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• ปรับปรุงคุณภาพการนอน</li>
                  <li>• เพิ่มพลังงาน</li>
                  <li>• สร้างความมั่นใจ</li>
                  <li>• พัฒนาการหายใจ</li>
                  <li>• สร้างสมดุลในชีวิต</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Yoga;