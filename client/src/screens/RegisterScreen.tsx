import { ChangeEvent, useContext, useEffect, useState, FormEvent } from "react";
import { Grid, Paper, Avatar } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import AuthContext from "../context/AuthContext";

export default function Signup() {
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [fatherName, setFatherName] = useState<string>("");
  const [familyName, setFamilyName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [gpa, setGpa] = useState<string>("");
  const [intrest, setIntrest] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [university, setUniversity] = useState<string>("");
  const [company, setCompany] = useState<string>("");

  useEffect(() => {
    setName("");
    setFatherName("");
    setFamilyName("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setGender("");
    setIntrest("");
    setMajor("");
    setCompany("");
    setUniversity("");
  }, [role]);

  const {
    registerStudent,
    registerUniversitySupervisor,
    registerCompanySupervisor,
  }: any = useContext(AuthContext);

  const handleIntrest = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setIntrest(event.target.value as string);
  };

  const handleMajor = (event: SelectChangeEvent) => {
    setMajor(event.target.value as string);
  };

  const handleUniversity = (event: SelectChangeEvent) => {
    setUniversity(event.target.value as string);
  };
  const handleCompany = (event: SelectChangeEvent) => {
    setCompany(event.target.value as string);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    switch (role) {
      case "student":
        registerStudent(
          event,
          name,
          fatherName,
          familyName,
          phoneNumber,
          gpa,
          email,
          password,
          gender,
          intrest,
          major,
          university
        );
        break;
      case "uniSupervisor":
        registerUniversitySupervisor(
          event,
          name,
          familyName,
          gender,
          phoneNumber,
          email,
          password,
          major,
          university
        );
        break;
      case "companySupervisor":
        registerCompanySupervisor(
          event,
          name,
          familyName,
          gender,
          phoneNumber,
          email,
          password,
          company
        );
        break;

      default:
        break;
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <Grid>
      <Paper
        elevation={20}
        style={{
          padding: "30px 20px",
          width: 500,
          margin: "100px auto",
          marginTop: 10,
        }}
      >
        <Grid>
          <Avatar style={{ backgroundColor: "#3C6255", marginLeft: 400 }}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={{ marginLeft: 350 }}>انشاء حساب</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <FormControl
            component="fieldset"
            style={{ marginTop: 10, textAlign: "right", width: "100%" }}
          >
            <FormLabel component="legend" color="primary">
              مهنة
            </FormLabel>
            <RadioGroup
              dir="rtl"
              name="role"
              style={{ display: "initial" }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setRole(e.target.value);
              }}
            >
              <FormControlLabel
                dir="rtl"
                value="student"
                control={<Radio color="secondary" />}
                label="طالب"
              />
              <FormControlLabel
                value="uniSupervisor"
                control={<Radio />}
                label="استاذ جامعي"
              />
              <FormControlLabel
                value="companySupervisor"
                control={<Radio />}
                label="مسؤل بيئة العمل "
              />
            </RadioGroup>
          </FormControl>
          <TextField
            dir="rtl"
            value={name}
            margin="normal"
            required
            fullWidth
            label="اسم الاول"
            name="firstName"
            autoComplete="off"
            autoFocus
            placeholder="اسم الاول"
            color="success"
            InputProps={{
              inputProps: {
                style: { textAlign: "right" },
              },
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
          {role === "student" && (
            <TextField
              value={fatherName}
              margin="normal"
              required
              fullWidth
              label="اسم الاب"
              autoComplete="off"
              autoFocus
              placeholder="اسم الاب"
              color="success"
              InputProps={{
                inputProps: {
                  style: { textAlign: "right" },
                },
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFatherName(e.target.value);
              }}
            />
          )}
          <TextField
            value={familyName}
            margin="normal"
            required
            fullWidth
            label="اسم العائلة"
            autoComplete="off"
            autoFocus
            placeholder="اسم العائلة"
            color="success"
            InputProps={{
              inputProps: {
                style: { textAlign: "right" },
              },
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFamilyName(e.target.value);
            }}
          />
          <FormControl
            component="fieldset"
            style={{ marginTop: 10, textAlign: "right", width: "100%" }}
          >
            <FormLabel component="legend">جنس</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              style={{ display: "initial" }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setGender(e.target.value);
              }}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="انثى"
              />
              <FormControlLabel value="male" control={<Radio />} label="ذكر" />
            </RadioGroup>
          </FormControl>
          {role === "student" && (
            <TextField
              value={gpa}
              margin="normal"
              required
              fullWidth
              label="معدل التراكمي"
              autoComplete="off"
              autoFocus
              placeholder="من ٥"
              color="success"
              InputProps={{
                inputProps: {
                  style: { textAlign: "right" },
                },
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setGpa(e.target.value);
              }}
            />
          )}
          <TextField
            value={phoneNumber}
            margin="normal"
            required
            fullWidth
            label="رقم الجوال"
            autoComplete="off"
            autoFocus
            placeholder="966+"
            color="success"
            InputProps={{
              inputProps: {
                style: { textAlign: "right" },
              },
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPhoneNumber(e.target.value);
            }}
          />

          <TextField
            value={email}
            margin="normal"
            required
            fullWidth
            label="البريد الاكتروني"
            autoComplete="off"
            autoFocus
            placeholder=".edu"
            color="success"
            InputProps={{
              inputProps: {
                style: { textAlign: "right" },
              },
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            value={password}
            margin="normal"
            required
            fullWidth
            type="password"
            label="كلمة السر"
            autoComplete="off"
            autoFocus
            placeholder="كلمة السر"
            color="success"
            InputProps={{
              inputProps: {
                style: { textAlign: "right" },
              },
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          {(role === "student" || role === "uniSupervisor") && (
            <>
              <InputLabel sx={{ textAlign: "right" }}>التخصص</InputLabel>
              <Select
                required
                value={major}
                color="success"
                fullWidth
                MenuProps={MenuProps}
                sx={{ textAlign: "right" }}
                onChange={handleMajor}
              >
                <MenuItem value={"طب"}>طب</MenuItem>
                <MenuItem value={"قانون"}>قانون</MenuItem>
                <MenuItem value={"هندسة"}>هندسة</MenuItem>
                <MenuItem value={"تقنية المعلومات"}>تقنية المعلومات</MenuItem>
                <MenuItem value={"العلوم"}>العلوم</MenuItem>
                <MenuItem value={"اقتصاد"}>اقتصاد</MenuItem>
                <MenuItem value={"ادارة الاعمال"}>ادارة الاعمال</MenuItem>
                <MenuItem value={"تسويق"}>تسويق</MenuItem>
                <MenuItem value={"محاسبة"}>محاسبة</MenuItem>
                <MenuItem value={"شريعة"}>شريعة</MenuItem>
                <MenuItem value={"لغات و ترجمة"}>لغات و ترجمة</MenuItem>
                <MenuItem value={"اعلام"}>اعلام</MenuItem>
                <MenuItem value={"صحافة"}>صحافة</MenuItem>
                <MenuItem value={"الزراعة والبيئة"}>الزراعة والبيئة</MenuItem>
              </Select>
            </>
          )}
          {role === "student" && (
            <>
              <InputLabel sx={{ textAlign: "right" }}>اهتمامك</InputLabel>
              <Select
                dir="ltr"
                required
                value={intrest}
                color="success"
                fullWidth
                MenuProps={MenuProps}
                sx={{ textAlign: "right" }}
                onChange={handleIntrest}
              >
                {/* {major === "تقنية المعلومات" && (
                  <div>
                    <MenuItem value={"امن المعلومات"}>امن المعلومات</MenuItem>
                    <MenuItem value={"حوسبة السحابية"}>حوسبة السحابية</MenuItem>
                    <MenuItem value={"الذكاء الاصطناعي"}>
                      الذكاء الاصطناعي
                    </MenuItem>
                  </div>
                )}
                {major === "ادارة الاعمال" && (
                  <div>
                    <MenuItem value={"X1"}>X1eco</MenuItem>
                    <MenuItem value={"X2"}>X2eco</MenuItem>
                    <MenuItem value={"X3"}>X3eco</MenuItem>
                  </div>
                )}
                {major === "قانون" && (
                  <div>
                    <MenuItem value={"X1"}>X1law</MenuItem>
                    <MenuItem value={"X2"}>X2law</MenuItem>
                    <MenuItem value={"X3"}>X3law</MenuItem>
                  </div>
                )} */}

                <MenuItem value={"طب"}>طب</MenuItem>
                <MenuItem value={"قانون"}>قانون</MenuItem>
                <MenuItem value={"هندسة"}>هندسة</MenuItem>
                <MenuItem value={"تقنية المعلومات"}>تقنية المعلومات</MenuItem>
                <MenuItem value={"العلوم"}>العلوم</MenuItem>
                <MenuItem value={"اقتصاد"}>اقتصاد</MenuItem>
                <MenuItem value={"ادارة الاعمال"}>ادارة الاعمال</MenuItem>
                <MenuItem value={"تسويق"}>تسويق</MenuItem>
                <MenuItem value={"محاسبة"}>محاسبة</MenuItem>
                <MenuItem value={"شريعة"}>شريعة</MenuItem>
                <MenuItem value={"لغات و ترجمة"}>لغات و ترجمة</MenuItem>
                <MenuItem value={"اعلام"}>اعلام</MenuItem>
                <MenuItem value={"صحافة"}>صحافة</MenuItem>
                <MenuItem value={"الزراعة والبيئة"}>الزراعة والبيئة</MenuItem>
              </Select>
            </>
          )}

          {(role === "student" || role === "uniSupervisor") && (
            <>
              <InputLabel sx={{ textAlign: "right" }}>الجامعة</InputLabel>
              <Select
                required
                value={university}
                color="success"
                fullWidth
                MenuProps={MenuProps}
                sx={{ textAlign: "right" }}
                onChange={handleUniversity}
              >
                <MenuItem value={"جامعة الامام محمد بن سعود"}>
                  جامعة الامام محمد بن سعود
                </MenuItem>
                <MenuItem value={"جامعة الملك سعود"}>جامعة الملك سعود</MenuItem>
                <MenuItem value={"جامعة الاميرة نوره"}>
                  جامعة الاميرة نوره
                </MenuItem>
                <MenuItem value={"تقنية المعلومات"}>جامعة ام القرى</MenuItem>
                <MenuItem value={">جامعة الملك عبدالعزيز"}>
                  جامعة الملك عبدالعزيز
                </MenuItem>
                <MenuItem value={"جامعة الملك فهد لي البترول و المعادن"}>
                  جامعة الملك فهد لي البترول و المعادن
                </MenuItem>
                <MenuItem value={"ادارة الاعمال"}>جامعة الملك فيصل</MenuItem>
                <MenuItem value={"تسويق"}>جامعة القصيم</MenuItem>
                <MenuItem value={"محاسبة"}>جامعة الملك خالد</MenuItem>
                <MenuItem value={"شريعة"}>جامعة حائل</MenuItem>
                <MenuItem value={"لغات و ترجمة"}>جامعة الطايف</MenuItem>
                <MenuItem value={"اعلام"}>جامعة تبوك</MenuItem>
                <MenuItem value={"صحافة"}>جامعة الامير سطام</MenuItem>
                <MenuItem value={"الزراعة والبيئة"}>
                  جامعة الامير سلطان بن عبدالعزيز
                </MenuItem>
                <MenuItem value={"صحافة"}>جامعة الجبيل الصناعية</MenuItem>
                <MenuItem value={"صحافة"}>جامعة ينبع الصناعية</MenuItem>
                <MenuItem value={"صحافة"}>جامعة الامير سطام</MenuItem>
                <MenuItem value={"صحافة"}>جامعة الامير سطام</MenuItem>
              </Select>
            </>
          )}
          {role === "companySupervisor" && (
            <>
              <InputLabel sx={{ textAlign: "right" }}>بيئة العمل</InputLabel>
              <Select
                required
                value={company}
                color="success"
                fullWidth
                MenuProps={MenuProps}
                onChange={handleCompany}
              >
                <MenuItem value={"سدايا"}>سدايا</MenuItem>
                <MenuItem value={"ارامكو السعودية"}>ارامكو السعودية</MenuItem>
                <MenuItem value={"سابك"}>سابك</MenuItem>
                <MenuItem value={"بنك الراجحي"}>بنك الراجحي</MenuItem>
                <MenuItem value={"الاتصالات السعودية"}>
                  الاتصالات السعودية
                </MenuItem>
                <MenuItem value={"بنك الانماء"}>بنك الانماء</MenuItem>
                <MenuItem value={"ادارة الاعمال"}>
                  الاتحاد السعودي للامن السيبراني و برمجة الدرونز
                </MenuItem>
                <MenuItem value={"الهيئة العامة للإحصاء"}>
                  الهيئة العامة للإحصاء
                </MenuItem>
              </Select>
            </>
          )}

          <FormControlLabel
            control={<Checkbox name="checkedA" />}
            label="اقبل بقوانين المنصه"
          />
          <Link
            href="/"
            variant="body2"
            sx={{ color: "#6ECCAF", marginLeft: 22 }}
          >
            {"لديك حساب في المنصة؟"}
          </Link>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#3C6255",
              "&:hover": {
                backgroundColor: "#86C8BC",
              },
            }}
          >
            انشاء حساب
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}
