import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";

const RecordWorkout = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    workoutType: "",
    bodyPart: "",
    duration: "",
    calories: "",
    notes: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage (in real app, would save to database)
    const existingWorkouts = JSON.parse(localStorage.getItem("workouts") || "[]");
    const newWorkout = {
      ...formData,
      id: Date.now(),
      username: JSON.parse(localStorage.getItem("user") || "{}")?.username || "user",
    };
    existingWorkouts.push(newWorkout);
    localStorage.setItem("workouts", JSON.stringify(existingWorkouts));

    toast({
      title: "บันทึกสำเร็จ!",
      description: "บันทึกการออกกำลังกายของคุณเรียบร้อยแล้ว",
    });

    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      workoutType: "",
      bodyPart: "",
      duration: "",
      calories: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">บันทึกการออกกำลังกาย</h1>
          <p className="text-muted-foreground">บันทึกผลการออกกำลังกายของคุณวันนี้</p>
        </div>

        <Card className="max-w-2xl mx-auto bg-gradient-card shadow-fitness">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              บันทึกผลการออกกำลังกาย
            </CardTitle>
            <CardDescription>
              กรอกข้อมูลการออกกำลังกายของคุณ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">วันที่</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workoutType">ประเภทการออกกำลังกาย</Label>
                  <Select value={formData.workoutType} onValueChange={(value) => setFormData({ ...formData, workoutType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกประเภท" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardio">Cardio</SelectItem>
                      <SelectItem value="yoga">Yoga</SelectItem>
                      <SelectItem value="bodybuilding">Bodybuilding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bodyPart">ส่วนที่ออกกำลังกาย</Label>
                  <Select value={formData.bodyPart} onValueChange={(value) => setFormData({ ...formData, bodyPart: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกส่วนของร่างกาย" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upper">ส่วนบน (แขน, หน้าอก, หลัง)</SelectItem>
                      <SelectItem value="lower">ส่วนล่าง (ขา, สะโพก)</SelectItem>
                      <SelectItem value="core">แกนกลางร่างกาย (หน้าท้อง)</SelectItem>
                      <SelectItem value="full-body">ทั้งร่างกาย</SelectItem>
                      <SelectItem value="cardio">Cardio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">ระยะเวลา (นาที)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="เช่น 30"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="calories">แคลอรี่ที่เผาผลาญ (ประมาณ)</Label>
                <Input
                  id="calories"
                  type="number"
                  placeholder="เช่น 250"
                  value={formData.calories}
                  onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">บันทึกเพิ่มเติม</Label>
                <Textarea
                  id="notes"
                  placeholder="บันทึกความรู้สึก, ท่าที่ฝึก, หรือข้อสังเกต..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full">
                บันทึกการออกกำลังกาย
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecordWorkout;