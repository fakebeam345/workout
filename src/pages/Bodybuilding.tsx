import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { Dumbbell, Target, TrendingUp, Plus, Minus } from "lucide-react";

const Bodybuilding = () => {
  const [currentWorkout, setCurrentWorkout] = useState<{
    exercises: { name: string; sets: { reps: number; weight: number; completed: boolean }[] }[];
    startTime: Date | null;
  }>({
    exercises: [],
    startTime: null
  });
  const { toast } = useToast();

  const exercises = {
    chest: [
      { name: "Push-ups", target: "หน้าอก, ไหล่, แขน", difficulty: "ง่าย" },
      { name: "Bench Press", target: "หน้าอก, ไหล่, แขน", difficulty: "ปานกลาง" },
      { name: "Incline Push-ups", target: "หน้าอกส่วนบน", difficulty: "ง่าย" },
      { name: "Chest Dips", target: "หน้าอกส่วนล่าง, แขน", difficulty: "ปานกลาง" },
      { name: "Chest Flyes", target: "หน้าอก", difficulty: "ปานกลาง" }
    ],
    back: [
      { name: "Pull-ups", target: "หลัง, แขน", difficulty: "ยาก" },
      { name: "Lat Pulldowns", target: "หลังส่วนบน", difficulty: "ปานกลาง" },
      { name: "Rows", target: "หลังกลาง", difficulty: "ปานกลาง" },
      { name: "Deadlifts", target: "หลัง, ขา, แกน", difficulty: "ยาก" },
      { name: "Superman", target: "หลังส่วนล่าง", difficulty: "ง่าย" }
    ],
    legs: [
      { name: "Squats", target: "ต้นขา, สะโพก", difficulty: "ปานกลาง" },
      { name: "Lunges", target: "ต้นขา, สะโพก", difficulty: "ง่าย" },
      { name: "Calf Raises", target: "น่อง", difficulty: "ง่าย" },
      { name: "Leg Press", target: "ต้นขา", difficulty: "ปานกลาง" },
      { name: "Hamstring Curls", target: "หลังต้นขา", difficulty: "ปานกลาง" }
    ],
    arms: [
      { name: "Bicep Curls", target: "กล้ามเนื้อหน้าแขน", difficulty: "ง่าย" },
      { name: "Tricep Dips", target: "กล้ามเนื้อหลังแขน", difficulty: "ปานกลาง" },
      { name: "Hammer Curls", target: "กล้ามเนื้อหน้าแขน", difficulty: "ง่าย" },
      { name: "Overhead Press", target: "ไหล่, แขน", difficulty: "ปานกลาง" },
      { name: "Tricep Extensions", target: "กล้ามเนื้อหลังแขน", difficulty: "ง่าย" }
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

  const addExerciseToWorkout = (exerciseName: string) => {
    const newExercise = {
      name: exerciseName,
      sets: [{ reps: 0, weight: 0, completed: false }]
    };

    setCurrentWorkout(prev => ({
      exercises: [...prev.exercises, newExercise],
      startTime: prev.startTime || new Date()
    }));

    toast({
      title: "เพิ่มท่าออกกำลังกาย",
      description: `เพิ่ม ${exerciseName} ลงในเซสชั่น`,
    });
  };

  const addSet = (exerciseIndex: number) => {
    setCurrentWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((exercise, index) =>
        index === exerciseIndex
          ? { ...exercise, sets: [...exercise.sets, { reps: 0, weight: 0, completed: false }] }
          : exercise
      )
    }));
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    setCurrentWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((exercise, index) =>
        index === exerciseIndex
          ? { ...exercise, sets: exercise.sets.filter((_, sIndex) => sIndex !== setIndex) }
          : exercise
      )
    }));
  };

  const updateSet = (exerciseIndex: number, setIndex: number, field: 'reps' | 'weight', value: number) => {
    setCurrentWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((exercise, index) =>
        index === exerciseIndex
          ? {
              ...exercise,
              sets: exercise.sets.map((set, sIndex) =>
                sIndex === setIndex ? { ...set, [field]: value } : set
              )
            }
          : exercise
      )
    }));
  };

  const toggleSetCompletion = (exerciseIndex: number, setIndex: number) => {
    setCurrentWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((exercise, index) =>
        index === exerciseIndex
          ? {
              ...exercise,
              sets: exercise.sets.map((set, sIndex) =>
                sIndex === setIndex ? { ...set, completed: !set.completed } : set
              )
            }
          : exercise
      )
    }));
  };

  const finishWorkout = () => {
    if (currentWorkout.exercises.length === 0) {
      toast({
        title: "ไม่สามารถบันทึกได้",
        description: "กรุณาเพิ่มท่าออกกำลังกายอย่างน้อย 1 ท่า",
        variant: "destructive",
      });
      return;
    }

    const completedSets = currentWorkout.exercises.reduce(
      (total, exercise) => total + exercise.sets.filter(set => set.completed).length, 0
    );

    const totalWeight = currentWorkout.exercises.reduce(
      (total, exercise) => total + exercise.sets.reduce((setTotal, set) => setTotal + (set.weight * set.reps), 0), 0
    );

    const sessionDuration = currentWorkout.startTime 
      ? Math.round((new Date().getTime() - currentWorkout.startTime.getTime()) / 60000)
      : completedSets * 2; // Estimate 2 minutes per set

    const workout = {
      id: Date.now(),
      username: JSON.parse(localStorage.getItem("user") || "{}")?.username || "user",
      date: new Date().toISOString().split('T')[0],
      workoutType: "bodybuilding",
      bodyPart: "mixed",
      duration: sessionDuration.toString(),
      calories: Math.round(completedSets * 25).toString(), // Estimate 25 calories per set
      notes: `Bodybuilding: ${currentWorkout.exercises.length} ท่า, ${completedSets} เซ็ต, ${totalWeight} kg รวม`,
    };

    const existingWorkouts = JSON.parse(localStorage.getItem("workouts") || "[]");
    existingWorkouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(existingWorkouts));

    toast({
      title: "บันทึกสำเร็จ!",
      description: `บันทึกการฝึก Bodybuilding ${completedSets} เซ็ต`,
    });

    // Reset workout
    setCurrentWorkout({ exercises: [], startTime: null });
  };

  const removeExercise = (exerciseIndex: number) => {
    setCurrentWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, index) => index !== exerciseIndex)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Dumbbell className="h-8 w-8 text-blue-500" />
            Bodybuilding Workout
          </h1>
          <p className="text-muted-foreground">สร้างกล้ามเนื้อและเพิ่มความแข็งแรงด้วยการฝึกแรงต้าน</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Workout */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-primary text-primary-foreground shadow-fitness">
              <CardHeader>
                <CardTitle className="text-xl">เซสชั่นปัจจุบัน</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  {currentWorkout.exercises.length} ท่า, {currentWorkout.exercises.reduce((total, ex) => total + ex.sets.length, 0)} เซ็ต
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentWorkout.exercises.length > 0 ? (
                  <>
                    {currentWorkout.exercises.map((exercise, exerciseIndex) => (
                      <div key={exerciseIndex} className="bg-primary-dark/20 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm">{exercise.name}</h4>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeExercise(exerciseIndex)}
                            className="text-primary-foreground hover:bg-primary-dark/30 h-6 w-6 p-0"
                          >
                            ×
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {exercise.sets.map((set, setIndex) => (
                            <div key={setIndex} className="flex items-center gap-2 text-xs">
                              <span className="w-8">#{setIndex + 1}</span>
                              <Input
                                type="number"
                                placeholder="รอบ"
                                value={set.reps || ''}
                                onChange={(e) => updateSet(exerciseIndex, setIndex, 'reps', parseInt(e.target.value) || 0)}
                                className="w-16 h-8 text-xs bg-primary-foreground text-primary"
                              />
                              <span className="text-xs">×</span>
                              <Input
                                type="number"
                                placeholder="กก."
                                value={set.weight || ''}
                                onChange={(e) => updateSet(exerciseIndex, setIndex, 'weight', parseInt(e.target.value) || 0)}
                                className="w-16 h-8 text-xs bg-primary-foreground text-primary"
                              />
                              <Button
                                size="sm"
                                variant={set.completed ? "secondary" : "ghost"}
                                onClick={() => toggleSetCompletion(exerciseIndex, setIndex)}
                                className="h-8 w-8 p-0"
                              >
                                ✓
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeSet(exerciseIndex, setIndex)}
                                className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-dark/30"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => addSet(exerciseIndex)}
                            className="w-full h-8 text-xs text-primary-foreground hover:bg-primary-dark/30"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            เพิ่มเซ็ต
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button 
                      onClick={finishWorkout}
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary-light"
                    >
                      จบเซสชั่น
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Dumbbell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm opacity-80">เลือกท่าออกกำลังกายเพื่อเริ่มต้น</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Exercise Library */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card shadow-fitness">
              <CardHeader>
                <CardTitle>คลังท่าออกกำลังกาย</CardTitle>
                <CardDescription>เลือกท่าที่ต้องการฝึกแล้วเพิ่มลงในเซสชั่น</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="chest" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="chest">หน้าอก</TabsTrigger>
                    <TabsTrigger value="back">หลัง</TabsTrigger>
                    <TabsTrigger value="legs">ขา</TabsTrigger>
                    <TabsTrigger value="arms">แขน</TabsTrigger>
                  </TabsList>

                  {Object.entries(exercises).map(([category, exerciseList]) => (
                    <TabsContent key={category} value={category} className="mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {exerciseList.map((exercise, index) => (
                          <div
                            key={index}
                            className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold">{exercise.name}</h4>
                                <p className="text-sm text-muted-foreground">{exercise.target}</p>
                              </div>
                              <Badge className={getDifficultyColor(exercise.difficulty)}>
                                {exercise.difficulty}
                              </Badge>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => addExerciseToWorkout(exercise.name)}
                              className="w-full mt-2"
                              disabled={currentWorkout.exercises.some(ex => ex.name === exercise.name)}
                            >
                              {currentWorkout.exercises.some(ex => ex.name === exercise.name) 
                                ? "เพิ่มแล้ว" 
                                : "เพิ่มลงเซสชั่น"
                              }
                            </Button>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Training Tips */}
            <Card className="bg-gradient-card shadow-fitness mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-accent" />
                  เคล็ดลับการฝึก Bodybuilding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">หลักการพื้นฐาน</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>เริ่มต้นด้วยน้ำหนักที่เหมาะสม</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>ฝึกท่าให้ถูกต้องก่อนเพิ่มน้ำหนัก</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>พักระหว่างเซ็ต 60-90 วินาที</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>หายใจออกตอนเหนื่อย หายใจเข้าตอนผ่อน</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">การพัฒนา</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>เพิ่มน้ำหนักเมื่อทำได้ง่าย</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>เปลี่ยนท่าทุก 6-8 สัปดาห์</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>ฝึกกล้ามเนื้อใหญ่ก่อนเล็ก</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>พักฟื้นกล้ามเนื้อ 48-72 ชั่วโมง</span>
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

export default Bodybuilding;