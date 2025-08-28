import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Zap, Dumbbell } from "lucide-react";
import Navigation from "@/components/Navigation";

const WorkoutModes = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">เลือกโหมดการออกกำลังกาย</h1>
          <p className="text-muted-foreground">เลือกประเภทการออกกำลังกายที่เหมาะกับเป้าหมายของคุณ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Cardio */}
          <Card className="bg-gradient-card shadow-fitness hover:shadow-xl transition-all duration-300 text-center">
            <CardHeader>
              <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
                <Heart className="h-10 w-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Cardio</CardTitle>
              <CardDescription>
                เพิ่มความแข็งแรงของหัวใจและเผาผลาญไขมัน
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                <p>• วิ่ง, เดิน, ปั่นจักรยาน</p>
                <p>• เสริมสร้างระบบหัวใจและหลอดเลือด</p>
                <p>• เผาผลาญแคลอรี่สูง</p>
              </div>
              <Link to="/cardio">
                <Button className="w-full">เริ่มโหมด Cardio</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Yoga */}
          <Card className="bg-gradient-card shadow-fitness hover:shadow-xl transition-all duration-300 text-center">
            <CardHeader>
              <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-secondary flex items-center justify-center">
                <Zap className="h-10 w-10 text-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl">Yoga</CardTitle>
              <CardDescription>
                เสริมสร้างความยืดหยุ่นและสมดุลของร่างกาย
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                <p>• ยืดกล้ามเนื้อ, สมดุล</p>
                <p>• ลดความเครียด</p>
                <p>• เพิ่มความยืดหยุ่น</p>
              </div>
              <Link to="/yoga">
                <Button variant="secondary" className="w-full">เริ่มโหมด Yoga</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Bodybuilding */}
          <Card className="bg-gradient-card shadow-fitness hover:shadow-xl transition-all duration-300 text-center">
            <CardHeader>
              <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
                <Dumbbell className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-2xl">Bodybuilding</CardTitle>
              <CardDescription>
                สร้างกล้ามเนื้อและเพิ่มความแข็งแรง
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                <p>• ยกน้ำหนัก, ฝึกแรงต้าน</p>
                <p>• สร้างมวลกล้ามเนื้อ</p>
                <p>• เพิ่มความแข็งแรง</p>
              </div>
              <Link to="/bodybuilding">
                <Button variant="outline" className="w-full">เริ่มโหมด Bodybuilding</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Link to="/dashboard">
            <Button variant="ghost">กลับไปหน้าแดชบอร์ด</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkoutModes;