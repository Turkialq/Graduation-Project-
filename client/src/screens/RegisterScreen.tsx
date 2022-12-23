import { ChangeEvent, useContext, useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
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
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import AuthContext from "../context/AuthContext";

export default function Signup() {
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [fatherName, setFatherName] = useState<string>("");
  const [familyName, setFamilyName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<number | any>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [gpa, setGpa] = useState<string>("");
  const [intrest, setIntrest] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [university, setUniversity] = useState<string>("");
  const [company, setCompany] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    setName("");
    setFatherName("");
    setFamilyName("");
    setPhoneNumber(0);
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
          <Avatar style={{ backgroundColor: "#1bbd7e", marginLeft: 400 }}>
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
              name="role"
              style={{ display: "initial" }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setRole(e.target.value);
              }}
            >
              <FormControlLabel
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
            type="number"
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
                required
                value={intrest}
                color="success"
                fullWidth
                MenuProps={MenuProps}
                sx={{ textAlign: "right" }}
                labelId="demo-multiple-chip-label"
                onChange={handleIntrest}
              >
                {major === "تقنية المعلومات" && (
                  <>
                    <MenuItem value={"امن المعلومات"}>امن المعلومات</MenuItem>
                    <MenuItem value={"حوسبة السحابية"}>حوسبة السحابية</MenuItem>
                    <MenuItem value={"الذكاء الاصطناعي"}>
                      الذكاء الاصطناعي
                    </MenuItem>
                  </>
                )}
                {major === "ادارة الاعمال" && (
                  <>
                    <MenuItem value={"X1"}>X1eco</MenuItem>
                    <MenuItem value={"X2"}>X2eco</MenuItem>
                    <MenuItem value={"X3"}>X3eco</MenuItem>
                  </>
                )}
                {major === "قانون" && (
                  <>
                    <MenuItem value={"X1"}>X1law</MenuItem>
                    <MenuItem value={"X2"}>X2law</MenuItem>
                    <MenuItem value={"X3"}>X3law</MenuItem>
                  </>
                )}

                {/* <MenuItem value={"طب"}>طب</MenuItem>
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
                <MenuItem value={"الزراعة والبيئة"}>الزراعة والبيئة</MenuItem> */}
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
                <MenuItem value={"العلوم"}>جامعة الملك عبدالعزيز</MenuItem>
                <MenuItem value={"اقتصاد"}>
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
                <MenuItem value={"اقتالعبيكانصاد"}>بنك الانماء</MenuItem>
                <MenuItem value={"ادارة الاعمال"}>
                  الاتحاد السعودي للامن السيبراني و برمجة الدرونز
                </MenuItem>
              </Select>
            </>
          )}
          <FormControlLabel
            control={<Checkbox name="checkedA" />}
            label="اقبل بقوانين المنصه"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#6ECCAF",
              "&:hover": {
                backgroundColor: "#6ECCAF",
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
