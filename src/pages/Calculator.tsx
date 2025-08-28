import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { Calculator as CalculatorIcon, Activity } from "lucide-react";

const Calculator = () => {
  const [bmiData, setBmiData] = useState({
    weight: "",
    height: "",
  });
  const [bmrData, setBmrData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
    activity: "",
  });
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [bmrResult, setBmrResult] = useState<{ bmr: number; tdee: number } | null>(null);

  const calculateBMI = () => {
    const weight = parseFloat(bmiData.weight);
    const height = parseFloat(bmiData.height) / 100; // convert to meters
    
    if (weight > 0 && height > 0) {
      const bmi = weight / (height * height);
      setBmiResult(Math.round(bmi * 100) / 100);
    }
  };

  const calculateBMR = () => {
    const weight = parseFloat(bmrData.weight);
    const height = parseFloat(bmrData.height);
    const age = parseFloat(bmrData.age);
    
    if (weight > 0 && height > 0 && age > 0 && bmrData.gender) {
      let bmr: number;
      
      // Harris-Benedict Equation
      if (bmrData.gender === "male") {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }

      // Calculate TDEE based on activity level
      const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9,
      };

      const multiplier = activityMultipliers[bmrData.activity as keyof typeof activityMultipliers] || 1.2;
      const tdee = bmr * multiplier;

      setBmrResult({
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
      });
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "น้ำหนักน้อย", color: "text-blue-600" };
    if (bmi < 23) return { category: "น้ำหนักปกติ", color: "text-green-600" };
    if (bmi < 25) return { category: "น้ำหนักเกิน", color: "text-yellow-600" };
    if (bmi < 30) return { category: "อ้วนระดับ 1", color: "text-orange-600" };
    return { category: "อ้วนระดับ 2", color: "text-red-600" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">คำนวณ BMI & BMR</h1>
          <p className="text-muted-foreground">คำนวณดัชนีมวลกายและอัตราการเผาผลาญพลังงานพื้นฐาน</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="bmi" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bmi">คำนวณ BMI</TabsTrigger>
              <TabsTrigger value="bmr">คำนวณ BMR</TabsTrigger>
            </TabsList>

            {/* BMI Calculator */}
            <TabsContent value="bmi">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gradient-card shadow-fitness">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalculatorIcon className="h-6 w-6 text-primary" />
                      คำนวณ BMI
                    </CardTitle>
                    <CardDescription>
                      ดัชนีมวลกาย (Body Mass Index)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">น้ำหนัก (กิโลกรัม)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="เช่น 70"
                        value={bmiData.weight}
                        onChange={(e) => setBmiData({ ...bmiData, weight: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">ส่วนสูง (เซนติเมตร)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="เช่น 170"
                        value={bmiData.height}
                        onChange={(e) => setBmiData({ ...bmiData, height: e.target.value })}
                      />
                    </div>
                    <Button onClick={calculateBMI} className="w-full">
                      คำนวณ BMI
                    </Button>
                  </CardContent>
                </Card>

                {bmiResult && (
                  <Card className="bg-gradient-card shadow-fitness">
                    <CardHeader>
                      <CardTitle>ผลการคำนวณ BMI</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center space-y-4">
                        <div className="text-4xl font-bold text-primary">{bmiResult}</div>
                        <div className={`text-lg font-semibold ${getBMICategory(bmiResult).color}`}>
                          {getBMICategory(bmiResult).category}
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p><strong>น้ำหนักน้อย:</strong> BMI &lt; 18.5</p>
                          <p><strong>น้ำหนักปกติ:</strong> BMI 18.5-22.9</p>
                          <p><strong>น้ำหนักเกิน:</strong> BMI 23-24.9</p>
                          <p><strong>อ้วนระดับ 1:</strong> BMI 25-29.9</p>
                          <p><strong>อ้วนระดับ 2:</strong> BMI &gt;= 30</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* BMR Calculator */}
            <TabsContent value="bmr">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gradient-card shadow-fitness">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-6 w-6 text-secondary" />
                      คำนวณ BMR
                    </CardTitle>
                    <CardDescription>
                      อัตราการเผาผลาญพลังงานพื้นฐาน (Basal Metabolic Rate)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bmr-weight">น้ำหนัก (กก.)</Label>
                        <Input
                          id="bmr-weight"
                          type="number"
                          placeholder="70"
                          value={bmrData.weight}
                          onChange={(e) => setBmrData({ ...bmrData, weight: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bmr-height">ส่วนสูง (ซม.)</Label>
                        <Input
                          id="bmr-height"
                          type="number"
                          placeholder="170"
                          value={bmrData.height}
                          onChange={(e) => setBmrData({ ...bmrData, height: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">อายุ (ปี)</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="25"
                        value={bmrData.age}
                        onChange={(e) => setBmrData({ ...bmrData, age: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>เพศ</Label>
                      <Select value={bmrData.gender} onValueChange={(value) => setBmrData({ ...bmrData, gender: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกเพศ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">ชาย</SelectItem>
                          <SelectItem value="female">หญิง</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>ระดับกิจกรรม</Label>
                      <Select value={bmrData.activity} onValueChange={(value) => setBmrData({ ...bmrData, activity: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกระดับกิจกรรม" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">นั่งทำงาน ไม่ออกกำลังกาย</SelectItem>
                          <SelectItem value="light">ออกกำลังกายเบาๆ 1-3 วัน/สัปดาห์</SelectItem>
                          <SelectItem value="moderate">ออกกำลังกายปานกลาง 3-5 วัน/สัปดาห์</SelectItem>
                          <SelectItem value="active">ออกกำลังกายหนัก 6-7 วัน/สัปดาห์</SelectItem>
                          <SelectItem value="very_active">ออกกำลังกายหนักมาก หรือทำงานหนัก</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={calculateBMR} className="w-full">
                      คำนวณ BMR
                    </Button>
                  </CardContent>
                </Card>

                {bmrResult && (
                  <Card className="bg-gradient-card shadow-fitness">
                    <CardHeader>
                      <CardTitle>ผลการคำนวณ BMR & TDEE</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-secondary mb-2">
                            {bmrResult.bmr} แคลอรี่/วัน
                          </div>
                          <p className="text-sm text-muted-foreground">BMR (อัตราการเผาผลาญพื้นฐาน)</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-3xl font-bold text-accent mb-2">
                            {bmrResult.tdee} แคลอรี่/วัน
                          </div>
                          <p className="text-sm text-muted-foreground">TDEE (พลังงานที่ใช้ทั้งวัน)</p>
                        </div>

                        <div className="text-xs text-muted-foreground space-y-1">
                          <p><strong>BMR:</strong> พลังงานที่ร่างกายต้องการในการดำรงชีวิตขั้นพื้นฐาน</p>
                          <p><strong>TDEE:</strong> พลังงานรวมที่ใช้ในการดำรงชีวิตและกิจกรรมต่างๆ</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Calculator;