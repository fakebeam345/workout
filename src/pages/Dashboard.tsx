import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Heart, Activity, Calculator, User, Utensils, BookOpen, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">แดชบอร์ด</h1>
          <p className="text-muted-foreground">จัดการและติดตามการออกกำลังกายของคุณ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Workout Modes */}
          <Card className="bg-gradient-card shadow-fitness hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                เลือกโหมดการออกกำลังกาย
              </CardTitle>
              <CardDescription>
                เลือกประเภทการออกกำลังกายที่เหมาะกับคุณ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/workout-modes">
                <Button className="w-full">เริ่มออกกำลังกาย</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Record Workout */}
          <Card className="bg-gradient-card shadow-fitness hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-secondary" />
                บันทึกการออกกำลังกาย
              </CardTitle>
              <CardDescription>
                บันทึกผลการออกกำลังกายของคุณ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/record-workout">
                <Button variant="secondary" className="w-full">บันทึกผล</Button>
              </Link>
            </CardContent>
          </Card>

          {/* BMI Calculator */}
          <Card className="bg-gradient-card shadow-fitness hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-6 w-6 text-accent" />
                คำนวณ BMI & BMR
              </CardTitle>
              <CardDescription>
                คำนวณดัชนีมวลกายและอัตราการเผาผลาญ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/calculator">
                <Button variant="outline" className="w-full">คำนวณ</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Exercise Guide */}
          <Card className="bg-gradient-card shadow-fitness hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                แนะนำท่าออกกำลังกาย
              </CardTitle>
              <CardDescription>
                เรียนรู้ท่าออกกำลังกายที่ถูกต้อง
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/exercise-guide">
                <Button className="w-full">ดูคำแนะนำ</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Workout Schedule */}
          <Card className="bg-gradient-card shadow-fitness hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-secondary" />
                ตารางออกกำลังกาย
              </CardTitle>
              <CardDescription>
                ดูตารางและประวัติการออกกำลังกาย
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/workout-schedule">
                <Button variant="secondary" className="w-full">ดูตาราง</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Nutrition */}
          <Card className="bg-gradient-card shadow-fitness hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-6 w-6 text-accent" />
                แนะนำอาหารการกิน
              </CardTitle>
              <CardDescription>
                คำแนะนำอาหารเพื่อสุขภาพ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/nutrition">
                <Button variant="outline" className="w-full">ดูคำแนะนำ</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center p-4">
            <h3 className="text-2xl font-bold text-primary">7</h3>
            <p className="text-muted-foreground">วันที่ออกกำลังกายแล้ว</p>
          </Card>
          <Card className="text-center p-4">
            <h3 className="text-2xl font-bold text-secondary">320</h3>
            <p className="text-muted-foreground">แคลอรี่ที่เผาผลาญ</p>
          </Card>
          <Card className="text-center p-4">
            <h3 className="text-2xl font-bold text-accent">12</h3>
            <p className="text-muted-foreground">ท่าที่เรียนรู้แล้ว</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;