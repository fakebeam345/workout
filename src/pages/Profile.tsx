import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { User, Edit3, Save } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    phone: "",
    username: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setIsEditing(false);
    toast({
      title: "บันทึกสำเร็จ",
      description: "ข้อมูลโปรไฟล์ของคุณได้รับการอัปเดตแล้ว",
    });
  };

  const getInitials = () => {
    return `${userInfo.firstName.charAt(0)}${userInfo.lastName.charAt(0)}`.toUpperCase();
  };

  // Get workout stats from localStorage
  const workouts = JSON.parse(localStorage.getItem("workouts") || "[]");
  const userWorkouts = workouts.filter((w: any) => w.username === userInfo.username);
  const totalWorkouts = userWorkouts.length;
  const totalCalories = userWorkouts.reduce((sum: number, w: any) => sum + (parseInt(w.calories) || 0), 0);
  const avgDuration = userWorkouts.length > 0 
    ? Math.round(userWorkouts.reduce((sum: number, w: any) => sum + (parseInt(w.duration) || 0), 0) / userWorkouts.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">โปรไฟล์</h1>
          <p className="text-muted-foreground">จัดการข้อมูลส่วนตัวของคุณ</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card shadow-fitness">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-6 w-6 text-primary" />
                    ข้อมูลส่วนตัว
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        บันทึก
                      </>
                    ) : (
                      <>
                        <Edit3 className="h-4 w-4 mr-2" />
                        แก้ไข
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{userInfo.firstName} {userInfo.lastName}</h3>
                    <p className="text-muted-foreground">@{userInfo.username}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">ชื่อ</Label>
                    <Input
                      id="firstName"
                      value={userInfo.firstName}
                      onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">นามสกุล</Label>
                    <Input
                      id="lastName"
                      value={userInfo.lastName}
                      onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">อายุ</Label>
                    <Input
                      id="age"
                      type="number"
                      value={userInfo.age}
                      onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                    <Input
                      id="phone"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">อีเมล</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-fitness">
              <CardHeader>
                <CardTitle>สถิติการออกกำลังกาย</CardTitle>
                <CardDescription>ข้อมูลสรุปการออกกำลังกายของคุณ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{totalWorkouts}</div>
                  <p className="text-sm text-muted-foreground">ครั้งที่ออกกำลังกาย</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">{totalCalories}</div>
                  <p className="text-sm text-muted-foreground">แคลอรี่ที่เผาผลาญ</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">{avgDuration}</div>
                  <p className="text-sm text-muted-foreground">นาที/ครั้ง (เฉลี่ย)</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-fitness">
              <CardHeader>
                <CardTitle>การออกกำลังกายล่าสุด</CardTitle>
              </CardHeader>
              <CardContent>
                {userWorkouts.length > 0 ? (
                  <div className="space-y-2">
                    {userWorkouts.slice(-3).reverse().map((workout: any, index: number) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{workout.workoutType}</span>
                        <span className="text-muted-foreground">{workout.date}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">ยังไม่มีการบันทึกการออกกำลังกาย</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;