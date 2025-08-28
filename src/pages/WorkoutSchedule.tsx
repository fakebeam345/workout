import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Navigation from "@/components/Navigation";
import { Calendar as CalendarIcon, Clock, Flame, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { th } from "date-fns/locale";

interface Workout {
  id: number;
  username: string;
  date: string;
  workoutType: string;
  bodyPart: string;
  duration: string;
  calories: string;
  notes: string;
}

const WorkoutSchedule = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedWorkouts, setSelectedWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    // Load workouts from localStorage
    const savedWorkouts = JSON.parse(localStorage.getItem("workouts") || "[]");
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}")?.username || "user";
    const userWorkouts = savedWorkouts.filter((w: Workout) => w.username === currentUser);
    setWorkouts(userWorkouts);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const dateString = format(selectedDate, "yyyy-MM-dd");
      const dayWorkouts = workouts.filter(w => w.date === dateString);
      setSelectedWorkouts(dayWorkouts);
    }
  }, [selectedDate, workouts]);

  const getWorkoutTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "cardio": return "bg-red-100 text-red-800";
      case "yoga": return "bg-purple-100 text-purple-800";
      case "bodybuilding": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getWorkoutTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "cardio": return "❤️";
      case "yoga": return "🧘";
      case "bodybuilding": return "💪";
      default: return "🏃";
    }
  };

  // Calculate stats
  const totalWorkouts = workouts.length;
  const totalCalories = workouts.reduce((sum, w) => sum + (parseInt(w.calories) || 0), 0);
  const totalMinutes = workouts.reduce((sum, w) => sum + (parseInt(w.duration) || 0), 0);
  const avgCaloriesPerWorkout = totalWorkouts > 0 ? Math.round(totalCalories / totalWorkouts) : 0;

  // Get workout dates for calendar highlighting
  const workoutDates = workouts.map(w => new Date(w.date));

  // Weekly summary
  const getWeeklySummary = () => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    
    const weekWorkouts = workouts.filter(w => {
      const workoutDate = new Date(w.date);
      return workoutDate >= weekAgo && workoutDate <= today;
    });

    return {
      count: weekWorkouts.length,
      calories: weekWorkouts.reduce((sum, w) => sum + (parseInt(w.calories) || 0), 0),
      minutes: weekWorkouts.reduce((sum, w) => sum + (parseInt(w.duration) || 0), 0)
    };
  };

  const weeklySummary = getWeeklySummary();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">ตารางออกกำลังกาย</h1>
          <p className="text-muted-foreground">ติดตามและดูประวัติการออกกำลังกายของคุณ</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{totalWorkouts}</div>
              <p className="text-sm text-muted-foreground">ครั้งทั้งหมด</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-secondary">{totalCalories}</div>
              <p className="text-sm text-muted-foreground">แคลอรี่ทั้งหมด</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{Math.round(totalMinutes / 60)}h {totalMinutes % 60}m</div>
              <p className="text-sm text-muted-foreground">เวลาทั้งหมด</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{avgCaloriesPerWorkout}</div>
              <p className="text-sm text-muted-foreground">แคลอรี่/ครั้ง (เฉลี่ย)</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-card shadow-fitness">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-6 w-6 text-primary" />
                  ปฏิทินการออกกำลังกาย
                </CardTitle>
                <CardDescription>เลือกวันที่เพื่อดูรายละเอียด</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={th}
                  className="rounded-md border"
                  modifiers={{
                    workout: workoutDates
                  }}
                  modifiersStyles={{
                    workout: {
                      backgroundColor: 'hsl(var(--primary))',
                      color: 'hsl(var(--primary-foreground))',
                      borderRadius: '50%'
                    }
                  }}
                />
                <div className="mt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span>วันที่มีการออกกำลังกาย</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Summary */}
            <Card className="bg-gradient-card shadow-fitness mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                  สรุป 7 วันที่ผ่านมา
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">จำนวนครั้ง</span>
                  <span className="font-semibold">{weeklySummary.count} ครั้ง</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">แคลอรี่รวม</span>
                  <span className="font-semibold">{weeklySummary.calories} kcal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">เวลารวม</span>
                  <span className="font-semibold">{weeklySummary.minutes} นาที</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Workout Details */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card shadow-fitness">
              <CardHeader>
                <CardTitle>
                  {selectedDate 
                    ? `การออกกำลังกายวันที่ ${format(selectedDate, "d MMMM yyyy", { locale: th })}`
                    : "เลือกวันที่เพื่อดูรายละเอียด"
                  }
                </CardTitle>
                <CardDescription>
                  {selectedWorkouts.length > 0 
                    ? `พบ ${selectedWorkouts.length} การออกกำลังกาย`
                    : "ไม่มีการออกกำลังกายในวันนี้"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedWorkouts.length > 0 ? (
                  <div className="space-y-4">
                    {selectedWorkouts.map((workout, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-muted/20">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getWorkoutTypeIcon(workout.workoutType)}</span>
                            <div>
                              <h4 className="font-semibold">{workout.workoutType}</h4>
                              <p className="text-sm text-muted-foreground">{workout.bodyPart}</p>
                            </div>
                          </div>
                          <Badge className={getWorkoutTypeColor(workout.workoutType)}>
                            {workout.workoutType}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{workout.duration} นาที</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Flame className="h-4 w-4 text-muted-foreground" />
                            <span>{workout.calories} แคลอรี่</span>
                          </div>
                        </div>
                        
                        {workout.notes && (
                          <div className="text-sm text-muted-foreground">
                            <strong>บันทึก:</strong> {workout.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📅</div>
                    <h3 className="text-lg font-semibold mb-2">ไม่มีการออกกำลังกาย</h3>
                    <p className="text-muted-foreground mb-4">
                      {selectedDate 
                        ? "ยังไม่มีการบันทึกการออกกำลังกายในวันนี้"
                        : "เลือกวันที่เพื่อดูรายละเอียด"
                      }
                    </p>
                    <Button asChild>
                      <a href="/record-workout">บันทึกการออกกำลังกาย</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSchedule;