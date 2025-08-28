import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dumbbell, Heart, Calculator, User, Utensils } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">FitTracker</h1>
            </div>
            <div className="flex space-x-4">
              <Link to="/login">
                <Button variant="outline">เข้าสู่ระบบ</Button>
              </Link>
              <Link to="/register">
                <Button>สมัครสมาชิก</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            เริ่มต้นเส้นทาง<br />การออกกำลังกายกับเรา
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            บันทึก ติดตาม และพัฒนาการออกกำลังกายของคุณ ด้วยระบบที่ครบครันและใช้งานง่าย
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary-light shadow-energy">
              เริ่มต้นฟรีวันนี้
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-card shadow-fitness hover:shadow-xl transition-all duration-300 text-center">
            <Dumbbell className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">บันทึกการออกกำลังกาย</h3>
            <p className="text-muted-foreground">
              บันทึกผลการออกกำลังกายทุกโหมด Cardio, Yoga, Bodybuilding
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card shadow-fitness hover:shadow-xl transition-all duration-300 text-center">
            <Heart className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">โหมดการออกกำลังกาย</h3>
            <p className="text-muted-foreground">
              เลือกโหมดที่เหมาะกับคุณ พร้อมคำแนะนำท่าต่างๆ
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card shadow-fitness hover:shadow-xl transition-all duration-300 text-center">
            <Calculator className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">คำนวณ BMI & BMR</h3>
            <p className="text-muted-foreground">
              คำนวณดัชนีมวลกายและอัตราการเผาผลาญพลังงาน
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card shadow-fitness hover:shadow-xl transition-all duration-300 text-center">
            <Utensils className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">แนะนำอาหารการกิน</h3>
            <p className="text-muted-foreground">
              คำแนะนำอาหารเพื่อสุขภาพที่เหมาะกับการออกกำลังกาย
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;