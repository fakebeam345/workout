import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { Heart, Clock, Flame, Play, Pause, RotateCcw } from "lucide-react";

const Cardio = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [workoutData, setWorkoutData] = useState({
    type: "วิ่ง",
    intensity: "ปานกลาง",
    notes: "",
  });
  const { toast } = useToast();

  const startTimer = () => {
    if (!isRunning) {
      const id = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
      setIntervalId(id);
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsRunning(false);
  };

  const resetTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const estimateCalories = () => {
    // Simple estimation: ~10 calories per minute for moderate cardio
    const minutes = Math.floor(time / 60);
    return Math.round(minutes * 10);
  };

  const saveWorkout = () => {
    if (time === 0) {
      toast({
        title: "ไม่สามารถบันทึกได้",
        description: "กรุณาเริ่มการออกกำลังกายก่อน",
        variant: "destructive",
      });
      return;
    }

    const workout = {
      id: Date.now(),
      username: JSON.parse(localStorage.getItem("user") || "{}")?.username || "user",
      date: new Date().toISOString().split('T')[0],
      workoutType: "cardio",
      bodyPart: "cardio",
      duration: Math.floor(time / 60).toString(),
      calories: estimateCalories().toString(),
      notes: `${workoutData.type} - ${workoutData.intensity} - ${workoutData.notes}`,
    };

    const existingWorkouts = JSON.parse(localStorage.getItem("workouts") || "[]");
    existingWorkouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(existingWorkouts));

    toast({
      title: "บันทึกสำเร็จ!",
      description: `บันทึกการออกกำลังกาย Cardio ${Math.floor(time / 60)} นาที`,
    });

    resetTimer();
    setWorkoutData({ type: "วิ่ง", intensity: "ปานกลาง", notes: "" });
  };

  const cardioTypes = [
    { name: "วิ่ง", calories: "300-500 kcal/ชม.", description: "เผาผลาญสูง ดีต่อหัวใจ" },
    { name: "เดิน", calories: "200-300 kcal/ชม.", description: "เหมาะสำหรับผู้เริ่มต้น" },
    { name: "ปั่นจักรยาน", calories: "250-400 kcal/ชม.", description: "ดีต่อข้อเข่า สนุก" },
    { name: "กระโดดเชือก", calories: "400-600 kcal/ชม.", description: "เผาผลาญสูงมาก" },
    { name: "ว่ายน้ำ", calories: "350-500 kcal/ชม.", description: "ออกกำลังกายทั้งร่างกาย" },
    { name: "เต้นแอโรบิค", calories: "300-450 kcal/ชม.", description: "สนุก เพิ่มความยืดหยุ่น" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500" />
            Cardio Workout
          </h1>
          <p className="text-muted-foreground">การออกกำลังกายเพื่อเสริมสร้างความแข็งแรงของหัวใจและเผาผลาญไขมัน</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timer */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-primary text-primary-foreground shadow-fitness">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">เครื่องจับเวลา</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  จับเวลาการออกกำลังกายของคุณ
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="text-6xl font-mono font-bold">
                  {formatTime(time)}
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    onClick={startTimer}
                    disabled={isRunning}
                    variant="secondary"
                    size="sm"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={pauseTimer}
                    disabled={!isRunning}
                    variant="secondary"
                    size="sm"
                  >
                    <Pause className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={resetTimer}
                    variant="secondary"
                    size="sm"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                {time > 0 && (
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>เวลา:</span>
                      <span>{Math.floor(time / 60)} นาที</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>แคลอรี่ (ประมาณ):</span>
                      <span>{estimateCalories()} kcal</span>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={saveWorkout}
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary-light"
                  disabled={time === 0}
                >
                  บันทึกการออกกำลังกาย
                </Button>
              </CardContent>
            </Card>

            {/* Workout Details */}
            <Card className="bg-gradient-card shadow-fitness mt-6">
              <CardHeader>
                <CardTitle>รายละเอียดการออกกำลังกาย</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardio-type">ประเภท Cardio</Label>
                  <Input
                    id="cardio-type"
                    value={workoutData.type}
                    onChange={(e) => setWorkoutData({ ...workoutData, type: e.target.value })}
                    placeholder="เช่น วิ่ง, เดิน, ปั่นจักรยาน"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="intensity">ความหนัก</Label>
                  <Input
                    id="intensity"
                    value={workoutData.intensity}
                    onChange={(e) => setWorkoutData({ ...workoutData, intensity: e.target.value })}
                    placeholder="เช่น เบา, ปานกลาง, หนัก"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">บันทึกเพิ่มเติม</Label>
                  <Textarea
                    id="notes"
                    value={workoutData.notes}
                    onChange={(e) => setWorkoutData({ ...workoutData, notes: e.target.value })}
                    placeholder="ความรู้สึก, สถานที่, หรือข้อสังเกต..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cardio Types */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card shadow-fitness">
              <CardHeader>
                <CardTitle>ประเภท Cardio แนะนำ</CardTitle>
                <CardDescription>เลือกประเภทการออกกำลังกายที่เหมาะกับคุณ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cardioTypes.map((type, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => setWorkoutData({ ...workoutData, type: type.name })}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{type.name}</h4>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Flame className="h-4 w-4" />
                          <span className="text-xs">{type.calories}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cardio Benefits */}
            <Card className="bg-gradient-card shadow-fitness mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-6 w-6 text-red-500" />
                  ประโยชน์ของ Cardio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">ประโยชน์ทางร่างกาย</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>เสริมสร้างความแข็งแรงของหัวใจ</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>เผาผลาญไขมันและลดน้ำหนัก</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>เพิ่มความอดทนและพลังงาน</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>ปรับปรุงการไหลเวียนโลหิต</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">ประโยชน์ทางใจ</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>ลดความเครียดและวิตกกังวล</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>เพิ่มความมั่นใจในตนเอง</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>ปรับปรุงคุณภาพการนอน</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>เพิ่มความสุขจากการออกกำลังกาย</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cardio;