import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Utensils, Clock, Users, Flame } from "lucide-react";

const Nutrition = () => {
  const mealPlans = [
    {
      id: 1,
      name: "อาหารเช้าเพื่อเพิ่มพลังงาน",
      description: "เริ่มต้นวันใหม่ด้วยอาหารที่ให้พลังงานสูง",
      calories: "350-450",
      prepTime: "15 นาที",
      servings: "1 คน",
      type: "breakfast",
      foods: [
        "ข้าวโอ๊ต + กล้วย + อัลมอนด์",
        "ไข่ต้ม 2 ฟอง + ขนมปังโฮลวีท",
        "โยเกิร์ตกรีก + เบอร์รี่ + น้ำผึ้ง"
      ]
    },
    {
      id: 2,
      name: "อาหารกลางวันโปรตีนสูง",
      description: "เหมาะสำหรับการสร้างกล้ามเนื้อ",
      calories: "500-600",
      prepTime: "25 นาที",
      servings: "1 คน",
      type: "lunch",
      foods: [
        "ข้าวกล้อง + อกไก่ย่าง + ผักรวม",
        "ปลาแซลมอน + ควินัว + บร็อกโคลี",
        "ไข่เจียว + ผักโขม + ขนมปังโฮลวีท"
      ]
    },
    {
      id: 3,
      name: "อาหารเย็นลดน้ำหนัก",
      description: "อาหารเย็นที่มีแคลอรี่ต่ำ แต่อิ่มท้อง",
      calories: "300-400",
      prepTime: "20 นาที",
      servings: "1 คน",
      type: "dinner",
      foods: [
        "สลัดไก่ย่าง + น้ำสลัดโยเกิร์ต",
        "ซุปผักโขม + เต้าหู้ + เห็ด",
        "ปลาทับทิมนึ่ง + ผักรวมต้ม"
      ]
    }
  ];

  const supplements = [
    {
      name: "โปรตีนเวย์",
      description: "ช่วยในการสร้างและซ่อมแซมกล้ามเนื้อ",
      timing: "หลังออกกำลังกาย 30 นาที",
      benefits: ["สร้างกล้ามเนื้อ", "ฟื้นฟูร่างกาย", "เพิ่มความแข็งแรง"]
    },
    {
      name: "ครีเอทีน",
      description: "เพิ่มพลังและความแข็งแรงในการออกกำลังกาย",
      timing: "ก่อนออกกำลังกาย 30 นาที",
      benefits: ["เพิ่มพลัง", "เพิ่มประสิทธิภาพ", "ฟื้นตัวเร็วขึ้น"]
    },
    {
      name: "วิตามินรวม",
      description: "เสริมสารอาหารที่จำเป็นต่อร่างกาย",
      timing: "หลังอาหารเช้า",
      benefits: ["เสริมภูมิคุ้มกัน", "เพิ่มพลังงาน", "สุขภาพดีขึ้น"]
    }
  ];

  const hydrationTips = [
    "ดื่มน้ำ 2-3 ลิตรต่อวัน",
    "ดื่มน้ำก่อนออกกำลังกาย 30 นาที",
    "ดื่มน้ำทันทีหลังออกกำลังกาย",
    "เพิ่มเกลือแร่เมื่อออกกำลังกายหนัก",
    "หลีกเลี่ยงแอลกอฮอล์ก่อน-หลังออกกำลังกาย"
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "breakfast": return "bg-yellow-100 text-yellow-800";
      case "lunch": return "bg-green-100 text-green-800";
      case "dinner": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case "breakfast": return "อาหารเช้า";
      case "lunch": return "อาหารกลางวัน";
      case "dinner": return "อาหารเย็น";
      default: return "อาหาร";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">แนะนำอาหารการกิน</h1>
          <p className="text-muted-foreground">คำแนะนำอาหารเพื่อสุขภาพและการออกกำลังกาย</p>
        </div>

        {/* Meal Plans */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">แผนอาหารแนะนำ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mealPlans.map((meal) => (
              <Card key={meal.id} className="bg-gradient-card shadow-fitness hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getTypeColor(meal.type)}>
                      {getTypeName(meal.type)}
                    </Badge>
                    <Flame className="h-5 w-5 text-orange-500" />
                  </div>
                  <CardTitle className="text-xl">{meal.name}</CardTitle>
                  <CardDescription>{meal.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Flame className="h-4 w-4" />
                      <span>{meal.calories} kcal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{meal.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{meal.servings}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">อาหารแนะนำ:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {meal.foods.map((food, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{food}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Supplements */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">อาหารเสริมแนะนำ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supplements.map((supplement, index) => (
              <Card key={index} className="bg-gradient-card shadow-fitness">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-6 w-6 text-secondary" />
                    {supplement.name}
                  </CardTitle>
                  <CardDescription>{supplement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-1">เวลาที่แนะนำ:</h4>
                      <p className="text-sm text-muted-foreground">{supplement.timing}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">ประโยชน์:</h4>
                      <div className="flex flex-wrap gap-2">
                        {supplement.benefits.map((benefit, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Hydration Tips */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">การดื่มน้ำและไฮเดรชั่น</h2>
          <Card className="bg-gradient-card shadow-fitness">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-6 w-6 text-accent" />
                คำแนะนำการดื่มน้ำ
              </CardTitle>
              <CardDescription>
                การดื่มน้ำที่เหมาะสมสำหรับการออกกำลังกาย
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hydrationTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;