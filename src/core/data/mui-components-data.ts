export interface MuiComponentProp {
  name: string;
  type: string;
  default: string;
  description: string;
}

export interface MuiComponentData {
  id: string;
  name: string;
  description: string;
  props: MuiComponentProp[];
  code: string;
  importCode: string;
}

export const MUI_COMPONENTS_DATA: MuiComponentData[] = [
  {
    id: "button",
    name: "Button (ปุ่ม)",
    description:
      "ปุ่มสำหรับโต้ตอบกับผู้ใช้ (User interaction) รองรับหลากหลายรูปแบบ ขนาด และสีสัน",
    importCode: `import Button from '@mui/material/Button';`,
    code: `<Button 
  variant="[variant]" 
  color="[color]" 
  size="[size]"
  [disabled]
  [disableElevation]
>
  Click Me
</Button>`,
    props: [
      {
        name: "variant",
        type: "'contained' | 'outlined' | 'text'",
        default: "'text'",
        description:
          "รูปแบบหน้าตาของปุ่ม (contained = ทึบ, outlined = เส้นขอบ, text = เฉพาะตัวอักษร)",
      },
      {
        name: "color",
        type: "'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'inherit'",
        default: "'primary'",
        description: "ธีมสีของปุ่มหลักที่อิงตาม MUI Theme palette",
      },
      {
        name: "size",
        type: "'small' | 'medium' | 'large'",
        default: "'medium'",
        description: "ขนาดความใหญ่ของปุ่ม",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "ปิดการใช้งานปุ่ม (ไม่สามารถคลิกได้ และสีจะดูจางลง)",
      },
      {
        name: "disableElevation",
        type: "boolean",
        default: "false",
        description:
          "ลบเงา (Box shadow) ของปุ่มแบบ contained ออก ทำให้ได้ดีไซน์แบนราบ (Flat design)",
      },
      {
        name: "fullWidth",
        type: "boolean",
        default: "false",
        description: "ขยายขนาดปุ่มให้เต็มความกว้างของ element แม่",
      },
    ],
  },
  {
    id: "textfield",
    name: "TextField (ช่องกรอกข้อมูล)",
    description:
      "ช่องกรอกข้อมูลแบบเดี่ยว (Input) รองรับการตรวจสอบความถูกต้อง การแสดงผลสถานะติดลบ/ผิดพลาด และ helper text",
    importCode: `import TextField from '@mui/material/TextField';`,
    code: `<TextField
  label="[label]"
  variant="[variant]"
  color="[color]"
  size="[size]"
  [error]
  [disabled]
  [fullWidth]
  helperText="[helperText]"
  placeholder="กรอกข้อมูล..."
/>`,
    props: [
      {
        name: "variant",
        type: "'outlined' | 'filled' | 'standard'",
        default: "'outlined'",
        description: "รูปแบบเส้นกรอบและสไตล์ของช่องกรอกข้อมูล",
      },
      {
        name: "label",
        type: "string",
        default: "-",
        description:
          "ป้ายชื่ออธิบายรายละเอียดของฟิลด์ข้อมูล จะขยับขึ้นด้านบนอัตโนมัติเมื่อมีการกรอกข้อมูล",
      },
      {
        name: "color",
        type: "'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'",
        default: "'primary'",
        description: "สีของกรอบเมื่อฟิลด์ถูกโฟกัส (Focus state)",
      },
      {
        name: "size",
        type: "'small' | 'medium'",
        default: "'medium'",
        description: "ขนาดของกล่องข้อความ",
      },
      {
        name: "error",
        type: "boolean",
        default: "false",
        description:
          "หากเปิดใช้งาน จะเปลี่ยนสีกรอบและข้อความแจ้งเตือนทั้งหมดให้เป็นสีแดงเพื่อบ่งบอกความผิดพลาด",
      },
      {
        name: "helperText",
        type: "string",
        default: "-",
        description: "ข้อความช่วยเหลือ/คำแนะนำสั้น ๆ ด้านล่างของช่องกรอกข้อมูล",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "ปิดการใช้งานช่องข้อมูล ไม่ให้พิมพ์หรือคลิกได้",
      },
      {
        name: "fullWidth",
        type: "boolean",
        default: "false",
        description: "กำหนดให้ความกว้างของฟิลด์ขยายจนเต็มพื้นที่ของ Container",
      },
      {
        name: "multiline",
        type: "boolean",
        default: "false",
        description:
          "เปิดใช้งานการเขียนแบบหลายบรรทัด (เปลี่ยนพฤติกรรมเป็น textarea)",
      },
    ],
  },
  {
    id: "select",
    name: "Select (รายการตัวเลือก)",
    description:
      "เมนูดรอปดาวน์สำหรับเลือกค่าเดียวหรือหลายค่าจากตัวเลือกที่มีให้",
    importCode: `import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';`,
    code: `<FormControl fullWidth size="[size]">
  <InputLabel id="demo-select-label">ตัวเลือก</InputLabel>
  <Select
    labelId="demo-select-label"
    id="demo-select"
    value={value}
    label="ตัวเลือก"
    onChange={handleChange}
    variant="[variant]"
  >
    <MenuItem value={10}>ตัวเลือกที่ 1</MenuItem>
    <MenuItem value={20}>ตัวเลือกที่ 2</MenuItem>
    <MenuItem value={30}>ตัวเลือกที่ 3</MenuItem>
  </Select>
</FormControl>`,
    props: [
      {
        name: "variant",
        type: "'outlined' | 'filled' | 'standard'",
        default: "'outlined'",
        description: "รูปแบบเส้นขอบและสไตล์พื้นหลังของกล่อง Select",
      },
      {
        name: "value",
        type: "any",
        default: "-",
        description:
          "ค่าที่กำลังถูกเลือกอยู่ในปัจจุบันเพื่อผูกเข้ากับ React State",
      },
      {
        name: "size",
        type: "'small' | 'medium'",
        default: "'medium'",
        description:
          "ขนาดความสูงของตัว Select (ปรับแต่งผ่าน FormControl หรือ Select)",
      },
      {
        name: "multiple",
        type: "boolean",
        default: "false",
        description: "เปิดให้สามารถเลือกหลายรายการพร้อมกันได้",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "ปิดใช้งานตัวเลือกดรอปดาวน์ทั้งหมด",
      },
    ],
  },
  {
    id: "checkbox-switch",
    name: "Checkbox & Switch (กล่องเครื่องหมายและสวิตช์)",
    description: "ตัวควบคุมสถานะเปิด/ปิด (Boolean state) หรือเลือกหลายตัวเลือก",
    importCode: `import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';`,
    code: `<FormGroup>
  <FormControlLabel 
    control={<Checkbox defaultChecked color="[color]" size="[size]" [disabled] />} 
    label="[label] (Checkbox)" 
  />
  <FormControlLabel 
    control={<Switch color="[color]" size="[size]" [disabled] />} 
    label="[label] (Switch)" 
  />
</FormGroup>`,
    props: [
      {
        name: "checked",
        type: "boolean",
        default: "-",
        description:
          "สถานะว่าถูกเลือก/เปิดใช้งานหรือไม่ (สำหรับแบบ Controlled)",
      },
      {
        name: "color",
        type: "'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'default'",
        default: "'primary'",
        description: "ธีมสีของ Checkbox หรือ Switch เมื่อมีสถานะ Checked",
      },
      {
        name: "size",
        type: "'small' | 'medium'",
        default: "'medium'",
        description: "ขนาดของตัวควบคุม",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "ปิดการใช้งานปุ่ม ไม่สามารถเปลี่ยนค่าได้",
      },
      {
        name: "label",
        type: "string",
        default: "-",
        description:
          "ข้อความอธิบายที่จะนำมาแสดงคู่กับ Checkbox/Switch (กำหนดผ่าน FormControlLabel)",
      },
    ],
  },
  {
    id: "card",
    name: "Card (การ์ด)",
    description:
      "กล่องครอบข้อมูล (Container) สำหรับรวมกลุ่มเนื้อหา คล้ายการ์ดสินค้า ข้อมูลโปรไฟล์ หรือบทความ",
    importCode: `import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';`,
    code: `<Card sx={{ maxWidth: 345 }} variant="[variant]">
  {/* ตัวอย่างภาพหน้าปก (หากมี) */}
  <CardMedia
    sx={{ height: 140 }}
    image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    title="Red Shoes"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      ชื่อหัวข้อบทความ
    </Typography>
    <Typography variant="body2" color="text.secondary">
      รายละเอียดเนื้อหา หรือข้อความอธิบายการ์ดแบบคร่าว ๆ แสดงข้อมูลเพื่อความชัดเจน
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">รายละเอียด</Button>
    <Button size="small">แชร์</Button>
  </CardActions>
</Card>`,
    props: [
      {
        name: "variant",
        type: "'elevation' | 'outlined'",
        default: "'elevation'",
        description:
          "สไตล์กรอบของการ์ด (elevation = มีเงา ลอยตัว, outlined = ขอบเรียบ ไม่มีเงา)",
      },
      {
        name: "raised",
        type: "boolean",
        default: "false",
        description:
          "ทำให้การ์ดดูนูนขึ้น มีเงาหนาขึ้น (เฉพาะ variant='elevation')",
      },
    ],
  },
  {
    id: "dialog",
    name: "Dialog (กล่องแจ้งเตือน/หน้าต่างป๊อปอัป)",
    description:
      "หน้าต่างขนาดเล็กที่โผล่ขึ้นมาลอยตัวเหนือคอนเทนต์ปกติ เพื่อบอกข้อมูลหรือขอความยืนยันจากผู้ใช้",
    importCode: `import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';`,
    code: `{/* ตัวอย่าง component ที่ใช้งาน Dialog */}
<Dialog 
  open={open} 
  onClose={handleClose}
  fullWidth={true}
  maxWidth="[maxWidth]"
>
  <DialogTitle>ยืนยันการทำรายการ?</DialogTitle>
  <DialogContent>
    <DialogContentText>
      คุณแน่ใจหรือไม่ว่าต้องการบันทึกข้อมูลนี้ลงในระบบ? การทำรายการนี้อาจใช้เวลาสักครู่
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="inherit">ยกเลิก</Button>
    <Button onClick={handleClose} variant="contained" color="success" autoFocus>
      ตกลง
    </Button>
  </DialogActions>
</Dialog>`,
    props: [
      {
        name: "open",
        type: "boolean",
        default: "false",
        description:
          "ควบคุมการแสดงผลของหน้าต่าง Dialog (true = เปิด, false = ปิด) *สำคัญ*",
      },
      {
        name: "onClose",
        type: "function",
        default: "-",
        description:
          "ฟังก์ชันที่จะทำงานเมื่อตรวจพบการปิด Dialog เช่น คลิกนอกพื้นที่หน้าต่าง หรือกดปุ่ม Escape",
      },
      {
        name: "maxWidth",
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | false",
        default: "'sm'",
        description: "กำหนดขนาดความกว้างสูงสุดที่เป็นมาตรฐานของกล่องข้อความ",
      },
      {
        name: "fullWidth",
        type: "boolean",
        default: "false",
        description:
          "สั่งให้ขยาย Dialog ให้กว้างเต็มขนาดของระดับ maxWidth ที่ตั้งค่าไว้",
      },
      {
        name: "fullScreen",
        type: "boolean",
        default: "false",
        description:
          "สั่งให้แสดง Dialog เต็มหน้าจอคอมพิวเตอร์หรือโทรศัพท์ทันที",
      },
    ],
  },
  {
    id: "table",
    name: "Table (ตารางข้อมูล)",
    description:
      "ตารางสำหรับจัดระเบียบข้อมูลที่มีปริมาณมากให้เป็นแถวเป็นคอลัมน์ ดูสะอาดและแบ่งหมวดหมู่ง่าย",
    importCode: `import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';`,
    code: `<TableContainer component={Paper} variant="[variant]">
  <Table sx={{ minWidth: 400 }} size="[size]" aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>ชื่อสินค้า</TableCell>
        <TableCell align="right">จำนวน</TableCell>
        <TableCell align="right">ราคา (บาท)</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell component="th" scope="row">เสื้อเชิ้ตลายตาราง</TableCell>
        <TableCell align="right">2</TableCell>
        <TableCell align="right">790</TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row">กางเกงสแล็คสีดำ</TableCell>
        <TableCell align="right">1</TableCell>
        <TableCell align="right">1,200</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>`,
    props: [
      {
        name: "size",
        type: "'small' | 'medium'",
        default: "'medium'",
        description:
          "ความกระชับของตาราง (small = ลดระยะห่าง padding เพื่อบีบอัดพื้นที่ให้กะทัดรัดขึ้น)",
      },
      {
        name: "variant",
        type: "'elevation' | 'outlined'",
        default: "'elevation'",
        description: "สไตล์เส้นขอบของ TableContainer (เช่น Paper container)",
      },
      {
        name: "align",
        type: "'inherit' | 'left' | 'center' | 'right' | 'justify'",
        default: "'inherit'",
        description: "การจัดแนวข้อความภายใน TableCell (เช่น ซ้าย, ขวา, กลาง)",
      },
    ],
  },
  {
    id: "alert",
    name: "Alert (การแจ้งเตือนความสำเร็จ/ล้มเหลว)",
    description:
      "แผงแสดงข้อความเตือนความจำ การตอบกลับของระบบ หรือสถานะการประมวลผล เพื่อดึงดูดสายตา",
    importCode: `import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';`,
    code: `<Alert 
  severity="[severity]" 
  variant="[variant]"
  [onClose]
>
  <AlertTitle>แจ้งเตือน</AlertTitle>
  นี่คือข้อความตัวอย่างสำหรับใช้อธิบายสถานะระบบ
</Alert>`,
    props: [
      {
        name: "severity",
        type: "'success' | 'info' | 'warning' | 'error'",
        default: "'success'",
        description:
          "ระดับความฉุกเฉินและสีของกล่องข้อความเตือน (เขียว, ฟ้า, ส้ม, แดง)",
      },
      {
        name: "variant",
        type: "'filled' | 'outlined' | 'standard'",
        default: "'standard'",
        description:
          "รูปแบบพื้นหลัง (standard = สว่างและโปร่งแสง, outlined = ขอบบาง, filled = พื้นหลังสีเข้มทึบ)",
      },
      {
        name: "onClose",
        type: "function",
        default: "-",
        description:
          "ฟังก์ชันจัดการการกดปิดการแจ้งเตือน (หากกำหนด จะแสดงปุ่ม (X) ด้านขวาบนกล่อง Alert อัตโนมัติ)",
      },
    ],
  },
  {
    id: "badge-chip",
    name: "Badge & Chip (ป้ายเลขจำนวนและชิปตัวเลือก)",
    description:
      "Badge สำหรับแสดงตัวเลขแจ้งเตือนเล็ก ๆ บนไอคอน และ Chip สำหรับแสดงป้ายกำกับ แท็ก หรือปุ่มขนาดกะทัดรัด",
    importCode: `import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
import MailIcon from '@mui/icons-material/Mail';`,
    code: `<div>
  {/* ตัวอย่าง Badge */}
  <Badge badgeContent={4} color="[color]" max={99}>
    <MailIcon color="action" />
  </Badge>

  {/* ตัวอย่าง Chip */}
  <Chip 
    label="MUI React" 
    variant="[variant]" 
    color="[color]"
    [onDelete] 
  />
</div>`,
    props: [
      {
        name: "badgeContent",
        type: "node",
        default: "-",
        description:
          "ตัวเลขหรือเนื้อหาที่จะแสดงในวงกลมของ Badge (เช่น 4, 'new')",
      },
      {
        name: "max",
        type: "number",
        default: "99",
        description:
          "ค่าสูงสุดที่จะแสดงผลใน Badge หากเกินจะเติมเครื่องหมายบวกให้เอง เช่น 99+",
      },
      {
        name: "label",
        type: "string",
        default: "-",
        description: "ข้อความหลักที่จะแสดงด้านในตัว Chip",
      },
      {
        name: "variant",
        type: "'filled' | 'outlined'",
        default: "'filled'",
        description:
          "สไตล์การลงพื้นหลังของ Chip (filled = สีทึบเต็ม, outlined = เส้นขอบโปร่งพื้นหลัง)",
      },
      {
        name: "color",
        type: "'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'default'",
        default: "'default'",
        description: "ธีมสีของทั้ง Badge และ Chip",
      },
      {
        name: "onDelete",
        type: "function",
        default: "-",
        description:
          "ฟังก์ชันที่จะรันเมื่อคลิกปุ่มกากบาทลบใน Chip (ถ้ากำหนด จะแสดงปุ่ม (X) ด้านในป้ายทันที)",
      },
    ],
  },
  {
    id: "tabs",
    name: "Tabs (แท็บเปลี่ยนหน้าต่าง)",
    description:
      "แถบเมนูที่ช่วยจัดกลุ่มหน้าคอนเทนต์หลายหน้าให้อยู่ในหน้าจอเดียวกัน โดยสลับกันแสดงผลเมื่อกดปุ่มแท็บ",
    importCode: `import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';`,
    code: `<Box sx={{ width: '100%' }}>
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Tabs 
      value={value} 
      onChange={handleChange} 
      textColor="[textColor]" 
      indicatorColor="[indicatorColor]"
      [centered]
    >
      <Tab label="แท็บที่ 1" />
      <Tab label="แท็บที่ 2" />
      <Tab label="แท็บที่ 3" />
    </Tabs>
  </Box>
</Box>`,
    props: [
      {
        name: "value",
        type: "any",
        default: "-",
        description:
          "อินเด็กซ์ชี้ตำแหน่งแท็บที่เปิดใช้งานอยู่ในปัจจุบัน (เริ่มนับจาก 0)",
      },
      {
        name: "centered",
        type: "boolean",
        default: "false",
        description:
          "จัดเรียงรายการปุ่มแท็บทั้งหมดให้อยู่กึ่งกลางหน้าจอความกว้าง",
      },
      {
        name: "textColor",
        type: "'primary' | 'secondary' | 'inherit'",
        default: "'primary'",
        description: "สีกราฟิกของข้อความเมื่อแท็บนั้นถูกโฟกัสใช้งาน",
      },
      {
        name: "indicatorColor",
        type: "'primary' | 'secondary'",
        default: "'primary'",
        description: "สีของแถบเส้นขีดไฮไลท์ด้านล่างปุ่มแท็บที่แอ็คทีฟอยู่",
      },
    ],
  },
  {
    id: "progress",
    name: "Progress (ตัวแสดงสถานะการโหลด)",
    description:
      "ตัวบ่งชี้การโหลดข้อมูลหรือความคืบหน้าการทำงาน มีทั้งรูปแบบวงกลม (Circular) หมุนวน และเส้นตรง (Linear) ด้านบนหน้าจอ",
    importCode: `import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';`,
    code: `<Box sx={{ width: '100%' }}>
  {/* ตัวบ่งชี้ความคืบหน้าแบบวงกลม */}
  <CircularProgress 
    variant="[variant]" 
    color="[color]" 
    value={value} 
    size={[size]} 
  />

  {/* ตัวบ่งชี้ความคืบหน้าแบบเส้นตรง */}
  <LinearProgress 
    variant="[variant]" 
    color="[color]" 
    value={value} 
    sx={{ mt: 2 }} 
  />
</Box>`,
    props: [
      {
        name: "variant",
        type: "'determinate' | 'indeterminate'",
        default: "'indeterminate'",
        description: "ประเภทการคำนวณ (indeterminate = หมุนวนไม่สิ้นสุด, determinate = แสดงตามเปอร์เซ็นต์ value)",
      },
      {
        name: "value",
        type: "number",
        default: "-",
        description: "เปอร์เซ็นต์ความสำเร็จของงาน (0 ถึง 100) ใช้คู่กับ variant='determinate'",
      },
      {
        name: "color",
        type: "'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'inherit'",
        default: "'primary'",
        description: "ธีมสีของตัวบ่งชี้ความคืบหน้า",
      },
      {
        name: "size",
        type: "number | string",
        default: "40",
        description: "ขนาดเส้นผ่านศูนย์กลางของ CircularProgress ในหน่วยพิกเซล (px)",
      },
    ],
  },
  {
    id: "slider",
    name: "Slider (แถบสไลด์ปรับค่า)",
    description:
      "เครื่องมือเลือกสเกลตัวเลขโดยการเลื่อนปรับค่า เหมาะสำหรับการตั้งระดับเสียง ปรับขนาด แสงสว่าง หรือช่วงตัวเลข",
    importCode: `import Slider from '@mui/material/Slider';`,
    code: `<Slider
  value={value}
  onChange={handleChange}
  min={[min]}
  max={[max]}
  step={[step]}
  color="[color]"
  disabled={[disabled]}
  valueLabelDisplay="[valueLabelDisplay]"
/>`,
    props: [
      {
        name: "value",
        type: "number | number[]",
        default: "-",
        description: "ค่าปัจจุบันของสไลเดอร์ สำหรับประยุกต์ใช้กับ React State",
      },
      {
        name: "min",
        type: "number",
        default: "0",
        description: "ค่าต่ำสุดที่อนุญาตให้เลื่อนได้",
      },
      {
        name: "max",
        type: "number",
        default: "100",
        description: "ค่าสูงสุดที่อนุญาตให้เลื่อนได้",
      },
      {
        name: "step",
        type: "number",
        default: "1",
        description: "ความละเอียดหรือช่วงก้าวการเลื่อนในแต่ละรอบ",
      },
      {
        name: "color",
        type: "'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'",
        default: "'primary'",
        description: "ธีมสีของแถบและปุ่มเลื่อนสไลเดอร์",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "ปิดการใช้งานแถบเลื่อนทั้งหมด",
      },
      {
        name: "valueLabelDisplay",
        type: "'on' | 'auto' | 'off'",
        default: "'off'",
        description: "การแสดงผลป้ายตัวเลขบอกค่าปัจจุบัน (on = แสดงตลอดเวลา, auto = แสดงเฉพาะเมื่อลากเมาส์)",
      },
    ],
  },
  {
    id: "avatar",
    name: "Avatar (รูปภาพโปรไฟล์)",
    description:
      "กล่องรูปทรงกลมหรือเหลี่ยมสำหรับแสดงรูปโปรไฟล์ผู้ใช้งาน ตัวอักษรชื่อย่อ หรือไอคอนแสดงเอกลักษณ์บุคคล",
    importCode: `import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';`,
    code: `<AvatarGroup max={4}>
  <Avatar 
    alt="User Name" 
    src="[src]" 
    variant="[variant]" 
    sx={{ width: [size], height: [size] }}
  />
  <Avatar variant="[variant]" sx={{ bgcolor: 'secondary.main', width: [size], height: [size] }}>OP</Avatar>
  <Avatar variant="[variant]" sx={{ bgcolor: 'primary.main', width: [size], height: [size] }}>UI</Avatar>
</AvatarGroup>`,
    props: [
      {
        name: "src",
        type: "string",
        default: "-",
        description: "ที่อยู่ URL รูปภาพผู้ใช้ที่จะนำมาแสดง",
      },
      {
        name: "alt",
        type: "string",
        default: "-",
        description: "ข้อความอธิบายรูปภาพสำรองเมื่อรูปโหลดไม่สำเร็จ",
      },
      {
        name: "variant",
        type: "'circular' | 'rounded' | 'square'",
        default: "'circular'",
        description: "รูปทรงของกล่องอวาตาร์ (circular = วงกลม, rounded = มุมมน, square = สี่เหลี่ยมจัตุรัส)",
      },
      {
        name: "sizes",
        type: "string",
        default: "-",
        description: "การกำหนดขนาดขนาดรูปภาพ (มักปรับความกว้าง/สูงแบบละเอียดผ่าน sx prop)",
      },
    ],
  },
  {
    id: "tooltip",
    name: "Tooltip (ข้อความแนะนำเมื่อชี้)",
    description:
      "ป้ายคำอธิบายเล็กๆ ที่แสดงขึ้นมาแบบลอยตัวเมื่อผู้ใช้เลื่อนเมาส์มาวางทับส่วนประกอบหลัก",
    importCode: `import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';`,
    code: `<Tooltip 
  title="[title]" 
  placement="[placement]" 
  arrow={[arrow]}
>
  <Button variant="outlined">Hover Me</Button>
</Tooltip>`,
    props: [
      {
        name: "title",
        type: "node",
        default: "-",
        description: "ข้อความหรือ React Element หลักที่จะแสดงภายในป้ายคำแนะนำ *สำคัญ*",
      },
      {
        name: "placement",
        type: "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' ...",
        default: "'bottom'",
        description: "ตำแหน่งที่ตั้งการแสดงป้ายข้อความเทียบกับองค์ประกอบหลัก",
      },
      {
        name: "arrow",
        type: "boolean",
        default: "false",
        description: "แสดงลูกศรชี้ระบุไปยังปุ่มหรือองค์ประกอบต้นทาง",
      },
    ],
  },
  {
    id: "accordion",
    name: "Accordion (กล่องพับเนื้อหา)",
    description:
      "แผงแสดงเนื้อหาเป็นกลุ่มย่อยที่สามารถคลิกยุบหรือคลี่ออกเพื่อซ่อนหรือเปิดเผยข้อมูลยาวๆ",
    importCode: `import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';`,
    code: `<Accordion variant="[variant]">
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography font-weight="bold">หัวข้อส่วนที่ 1</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>รายละเอียดข้อมูลสรุปเนื้อหารายการต่างๆ ที่ต้องการยุบขยาย</Typography>
  </AccordionDetails>
</Accordion>`,
    props: [
      {
        name: "expanded",
        type: "boolean",
        default: "-",
        description: "กำหนดค่าขยายยุบด้วย State ภายนอก (สำหรับแบบ Controlled)",
      },
      {
        name: "variant",
        type: "'elevation' | 'outlined'",
        default: "'elevation'",
        description: "รูปแบบเส้นขอบเงา (elevation = เงาลอย, outlined = กรอบขอบแบนไม่มีเงา)",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "ปิดการทำงานของแถบเมนูพับทั้งหมด ไม่สามารถกดเปิดได้",
      },
    ],
  },
  {
    id: "autocomplete",
    name: "Autocomplete (ช่องแนะนำตัวเลือกอัตโนมัติ)",
    description:
      "ช่องกรอกข้อมูลแบบ Input ที่ดึงตัวกรองมาแสดงแนะนำและเดาคำค้นหาแก่ผู้ใช้แบบสมาร์ทจากข้อมูลอาเรย์",
    importCode: `import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';`,
    code: `<Autocomplete
  options={options}
  value={value}
  onChange={handleChange}
  disabled={[disabled]}
  renderInput={(params) => (
    <TextField {...params} label="[label]" variant="outlined" />
  )}
/>`,
    props: [
      {
        name: "options",
        type: "any[]",
        default: "[]",
        description: "อาร์เรย์รายการของตัวเลือกที่ให้ค้นหาในดรอปดาวน์ *สำคัญ*",
      },
      {
        name: "value",
        type: "any",
        default: "-",
        description: "ค่าตัวเลือกที่กำลังเลือกอยู่ สำหรับจัดเก็บลง state",
      },
      {
        name: "renderInput",
        type: "function",
        default: "-",
        description: "ฟังก์ชันส่งค่าเพื่อใช้วาดหน้าตาตัวควบคุม (มักส่ง TextField ของ MUI ไปแสดงผล)",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "ปิดการใช้งานช่องพิมพ์และคัดกรองข้อมูลทั้งหมด",
      },
    ],
  },
  {
    id: "pagination",
    name: "Pagination (แถบแบ่งหน้าข้อมูล)",
    description:
      "เครื่องมือนำทางแบ่งหน้าเอกสารหรือหน้าต่างรายการสินค้าออกเป็นหลายแผ่นย่อย เพื่อความสะดวกในการโหลด",
    importCode: `import Pagination from '@mui/material/Pagination';`,
    code: `<Pagination 
  count={[count]} 
  page={page} 
  onChange={handleChange} 
  color="[color]" 
  variant="[variant]" 
  shape="[shape]" 
/>`,
    props: [
      {
        name: "count",
        type: "number",
        default: "1",
        description: "จำนวนหน้าทั้งหมดของชุดข้อมูลที่จะแบ่งแสดงผล *สำคัญ*",
      },
      {
        name: "page",
        type: "number",
        default: "1",
        description: "หมายเลขหน้าปัจจุบันที่เปิดอยู่",
      },
      {
        name: "color",
        type: "'primary' | 'secondary' | 'standard'",
        default: "'standard'",
        description: "ธีมสีของปุ่มหน้าเพจที่แอ็คทีฟอยู่",
      },
      {
        name: "variant",
        type: "'outlined' | 'text'",
        default: "'text'",
        description: "รูปแบบปุ่ม (outlined = มีกรอบล้อมรอบ, text = พื้นปุ่มกลืนกับพื้นหลัง)",
      },
      {
        name: "shape",
        type: "'circular' | 'rounded'",
        default: "'circular'",
        description: "รูปทรงของปุ่ม (circular = วงกลมมาตรฐาน, rounded = สี่เหลี่ยมมุมมน)",
      },
    ],
  },
  {
    id: "breadcrumbs",
    name: "Breadcrumbs (เมนูระบุตำแหน่ง)",
    description:
      "ป้ายเส้นทางลำดับการเยือนเว็บ ช่วยให้ผู้ใช้จดจำโครงสร้างตำแหน่งปัจจุบันของตน และกดลิ้งค์ย้อนกลับได้ง่าย",
    importCode: `import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';`,
    code: `<Breadcrumbs separator="[separator]" maxItems={[maxItems]}>
  <Link href="#" underline="hover" color="inherit">หน้าแรก</Link>
  <Link href="#" underline="hover" color="inherit">หมวดหมู่สินค้า</Link>
  <Typography color="text.primary">หน้าปัจจุบัน</Typography>
</Breadcrumbs>`,
    props: [
      {
        name: "separator",
        type: "node",
        default: "'/'",
        description: "ตัวคั่นระหว่างรายการระดับชั้นข้อมูล (เช่น เครื่องหมายขีดทแยง, ลูกศร หรือจุดเดี่ยว)",
      },
      {
        name: "maxItems",
        type: "number",
        default: "8",
        description: "จำนวนรายการแสดงผลสูงสุด หากระดับลิ้งก์ยาวเกินจะยุบกึ่งกลางใส่สัญลักษณ์จุดสามจุดแทน",
      },
    ],
  },
  {
    id: "rating",
    name: "Rating (ดาวให้คะแนน)",
    description:
      "ดาวเลือกเรตติ้งสำหรับใช้วัดความพึงพอใจ ให้แต้มรีวิวร้านค้า หรือให้ระดับระดับดาวความสนใจ",
    importCode: `import Rating from '@mui/material/Rating';`,
    code: `<Rating
  name="custom-rating"
  value={value}
  onChange={handleChange}
  precision={[precision]}
  size="[size]"
  disabled={[disabled]}
  readOnly={[readOnly]}
/>`,
    props: [
      {
        name: "value",
        type: "number",
        default: "-",
        description: "จำนวนดาวที่เลือกประเมินปัจจุบัน (รองรับเลขทศนิยมตามสเกลความละเอียด)",
      },
      {
        name: "precision",
        type: "number",
        default: "1",
        description: "ความละเอียดขั้นบันไดในการกดเลือกดาว (เช่น 1 = ได้ทีละดวงเต็ม, 0.5 = ได้ทีละครึ่งดวง)",
      },
      {
        name: "size",
        type: "'small' | 'medium' | 'large'",
        default: "'medium'",
        description: "ขนาดความกว้างใหญ่ของรูปดาวแสดงผล",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "ปิดใช้งานปุ่มดาวทั้งหมด ตัวเลือกจะมีสีทึบจางลงและคลิกเปลี่ยนไม่ได้",
      },
      {
        name: "readOnly",
        type: "boolean",
        default: "false",
        description: "แสดงดาวเป็นป้ายสถานะเฉยๆ ให้ดูได้เท่านั้น ไม่สามารถกดเลือกคะแนนได้",
      },
    ],
  },
  {
    id: "skeleton",
    name: "Skeleton (โครงลวดลายจำลองโหลด)",
    description:
      "บล็อกจำลองวางรูปทรงล้อเลียนความกว้างความสูงของเนื้อหาจริงที่จะตามมา เพื่อปรับปรุงคุณภาพการรอโหลดเนื้อหา",
    importCode: `import Skeleton from '@mui/material/Skeleton';`,
    code: `<Skeleton 
  variant="[variant]" 
  animation="[animation]" 
  width={[width]} 
  height={[height]} 
/>`,
    props: [
      {
        name: "variant",
        type: "'text' | 'circular' | 'rectangular' | 'rounded'",
        default: "'text'",
        description: "สไตล์รูปร่างโครงร่างจำลอง (text = เส้นแถวข้อความ, circular = วงกลมแบบโปรไฟล์, rectangular = สี่เหลี่ยมคม, rounded = สี่เหลี่ยมมน)",
      },
      {
        name: "animation",
        type: "'pulse' | 'wave' | false",
        default: "'pulse'",
        description: "ประเภทเอฟเฟกต์แอนิเมชันขยับ (pulse = กะพริบจางหาย, wave = เลื่อนคลื่นแสงไฮไลท์, false = ค้างนิ่ง)",
      },
      {
        name: "width",
        type: "number | string",
        default: "-",
        description: "ความกว้างของชิ้นโครงลวดลายจำลอง (เช่น 210, '100%')",
      },
      {
        name: "height",
        type: "number | string",
        default: "-",
        description: "ความสูงของชิ้นโครงลวดลายจำลอง",
      },
    ],
  },
  {
    id: "button-group",
    name: "ButtonGroup (กลุ่มปุ่มกด)",
    description:
      "แผงรวมกลุ่มปุ่มหลายปุ่มเข้าด้วยกันในแนวตั้งหรือแนวนอน เพื่อจัดหมวดหมู่การกดเลือกที่มีความเกี่ยวข้องกัน",
    importCode: `import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';`,
    code: `<ButtonGroup 
  variant="[variant]" 
  color="[color]" 
  orientation="[orientation]" 
  size="[size]"
  disabled={[disabled]}
>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>`,
    props: [
      {
        name: "variant",
        type: "'contained' | 'outlined' | 'text'",
        default: "'outlined'",
        description: "รูปแบบหน้าตาของกลุ่มปุ่มกดทั้งหมดพร้อมกัน",
      },
      {
        name: "orientation",
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: "ทิศทางการจัดเรียงรายการปุ่มกด (horizontal = แนวนอน, vertical = แนวตั้ง)",
      },
      {
        name: "color",
        type: "'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'inherit'",
        default: "'primary'",
        description: "ธีมสีของทุกปุ่มในกลุ่ม",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "ปิดการใช้งานทุกปุ่มในกลุ่มพร้อมกัน",
      },
    ],
  },
  {
    id: "radio-group",
    name: "RadioGroup (ปุ่มเลือกวิทยุ)",
    description:
      "ปุ่มตัวเลือกวงกลมที่ยอมให้ผู้ใช้คลิกเลือกค่าที่ต้องการได้เพียงหนึ่งค่าเดียวจากชุดกลุ่มตัวเลือกทั้งหมดที่มี",
    importCode: `import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';`,
    code: `<FormControl>
  <FormLabel id="demo-radio-buttons-group-label">[label]</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    value={value}
    onChange={handleChange}
    row={[row]}
  >
    <FormControlLabel value="female" control={<Radio color="[color]" disabled={[disabled]} />} label="ผู้หญิง" />
    <FormControlLabel value="male" control={<Radio color="[color]" disabled={[disabled]} />} label="ผู้ชาย" />
    <FormControlLabel value="other" control={<Radio color="[color]" disabled={[disabled]} />} label="อื่นๆ" />
  </RadioGroup>
</FormControl>`,
    props: [
      {
        name: "value",
        type: "any",
        default: "-",
        description: "ค่าปัจจุบันที่ถูกเลือกอยู่เพื่อเชื่อมโยงกับ React State",
      },
      {
        name: "row",
        type: "boolean",
        default: "false",
        description: "แสดงตัวเลือกเรียงต่อกันในแนวนอน แทนการจัดเรียงแนวตั้งมาตรฐาน",
      },
      {
        name: "color",
        type: "'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'default'",
        default: "'primary'",
        description: "ธีมสีของปุ่มวิทยุเมื่อถูกกดเลือก",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "ปิดการคลิกเลือกใช้งานปุ่มทางเลือก",
      },
    ],
  },
  {
    id: "list",
    name: "List (รายการเมนู/ลิสต์ข้อความ)",
    description:
      "ชุดแสดงกล่องรายการแถวข้อความเรียงลำดับ เหมาะสำหรับการทำเมนูนำทาง หน้าตั้งค่า หรือแสดงข้อมูลประเภทรายชื่อ",
    importCode: `import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import Divider from '@mui/material/Divider';`,
    code: `<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
  <ListItem disablePadding>
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="กล่องข้อความเข้า" secondary="มีอีเมลใหม่ 3 ฉบับ" />
    </ListItemButton>
  </ListItem>
  <Divider />
  <ListItem disablePadding>
    <ListItemButton>
      <ListItemText primary="ถังขยะ" />
    </ListItemButton>
  </ListItem>
</List>`,
    props: [
      {
        name: "dense",
        type: "boolean",
        default: "false",
        description: "ลดขนาดความกว้าง/ความสูงและ padding ของลิสต์ลงเพื่อให้จัดวางได้หนาแน่นขึ้น",
      },
      {
        name: "disablePadding",
        type: "boolean",
        default: "false",
        description: "ลบขอบระยะห่าง padding ด้านในรอบๆ รายการปุ่มลิสต์",
      },
    ],
  },
  {
    id: "stepper",
    name: "Stepper (ลำดับขั้นตอนทำงาน)",
    description:
      "ตัวนำทางแบบแถบขั้นตอนสำหรับแสดงความคืบหน้าของงานที่เป็นขั้นเป็นตอน เช่น ขั้นตอนจ่ายเงิน หรือกรอกใบสมัครงาน",
    importCode: `import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';`,
    code: `<Box sx={{ width: '100%' }}>
  <Stepper activeStep={activeStep} alternativeLabel={[alternativeLabel]}>
    <Step>
      <StepLabel>กรอกที่อยู่ผู้รับ</StepLabel>
    </Step>
    <Step>
      <StepLabel>ชำระเงินออนไลน์</StepLabel>
    </Step>
    <Step>
      <StepLabel>ยืนยันคำสั่งซื้อ</StepLabel>
    </Step>
  </Stepper>
</Box>`,
    props: [
      {
        name: "activeStep",
        type: "number",
        default: "0",
        description: "ขั้นตอนปัจจุบันที่กำลังทำงานอยู่ (เริ่มนับจาก 0)",
      },
      {
        name: "alternativeLabel",
        type: "boolean",
        default: "false",
        description: "สั่งให้ป้ายข้อความกำกับขั้นตอนลงมาอยู่กึ่งกลางด้านใต้ปุ่มเลขขั้นตอน",
      },
      {
        name: "orientation",
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: "การจัดเรียงแนวของสเตปเปอร์ (horizontal = แนวนอน, vertical = แนวตั้งลงล่าง)",
      },
    ],
  },
  {
    id: "drawer",
    name: "Drawer (แผงเมนูสไลด์ข้าง)",
    description:
      "แผงควบคุมสไลด์ (Sidebar Drawer) ที่เลื่อนออกมาจากขอบหน้าจอด้านต่างๆ เพื่อซ่อนเมนูลิงก์หรือตัวกรองเสริม",
    importCode: `import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';`,
    code: `<Drawer
  anchor="[anchor]"
  open={open}
  onClose={handleClose}
>
  <Box sx={{ width: 250 }} role="presentation" onClick={handleClose}>
    <List>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText primary="เมนูหลัก" />
        </ListItemButton>
      </ListItem>
    </List>
  </Box>
</Drawer>`,
    props: [
      {
        name: "anchor",
        type: "'left' | 'top' | 'right' | 'bottom'",
        default: "'left'",
        description: "ทิศทางการเลื่อนสไลด์สตรีมออกมาของแผงพาเนล",
      },
      {
        name: "open",
        type: "boolean",
        default: "false",
        description: "ควบคุมการเปิด/ปิดพาเนลลิสต์เมนูสไลด์ (true = เปิด, false = ปิด) *สำคัญ*",
      },
      {
        name: "variant",
        type: "'temporary' | 'persistent' | 'permanent'",
        default: "'temporary'",
        description: "รูปแบบพฤติกรรมพาเนล (temporary = ซ่อนและคลิกปิดได้, persistent = ชนขอบเนื้อหา, permanent = ล็อคค้างถาวร)",
      },
    ],
  },
  {
    id: "appbar",
    name: "AppBar (แถบเมนูนำทางด้านบน)",
    description:
      "แถบหัวข้อหลักและแถบเครื่องมือนำทาง (NavBar) ปักหลักอยู่ส่วนบนสุดของหน้าเว็บ สำหรับแสดงหัวข้อและโลโก้",
    importCode: `import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';`,
    code: `<AppBar position="[position]" color="[color]">
  <Toolbar>
    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      Dev Library
    </Typography>
    <Button color="inherit">เข้าสู่ระบบ</Button>
  </Toolbar>
</AppBar>`,
    props: [
      {
        name: "position",
        type: "'fixed' | 'absolute' | 'sticky' | 'static' | 'relative'",
        default: "'fixed'",
        description: "สไตล์การจัดวางตำแหน่งบนจอ (fixed = ตรึงไว้ตลอด, static = วิ่งตามสกรอลล์ปกติ, sticky = ตรึงเมื่อสกรอลล์ถึง)",
      },
      {
        name: "color",
        type: "'primary' | 'secondary' | 'default' | 'transparent' | 'inherit'",
        default: "'primary'",
        description: "ธีมสีพื้นหลังหลักของ Navbar",
      },
    ],
  },
  {
    id: "menu",
    name: "Menu (รายการเมนูป๊อปอัป)",
    description:
      "กล่องคำสั่งเสริมชี้ป๊อปอัปขึ้นมาแบบลอยตัวเมื่อเกิดการคลิกโต้ตอบบนองค์ประกอบต้นทาง เช่น คลิกไอคอนโปรไฟล์",
    importCode: `import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';`,
    code: `<div>
  <Button onClick={handleClick}>ตัวเลือกจัดการ</Button>
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
  >
    <MenuItem onClick={handleClose}>ข้อมูลส่วนตัว</MenuItem>
    <MenuItem onClick={handleClose}>การตั้งค่าระบบ</MenuItem>
    <MenuItem onClick={handleClose}>ออกจากระบบ</MenuItem>
  </Menu>
</div>`,
    props: [
      {
        name: "anchorEl",
        type: "Element | Function",
        default: "-",
        description: "ผูก DOM Element ที่เป็นตัวกดเปิด เพื่อให้เมนูแสดงลอยตัวอยู่ในจุดอ้างอิงนั้น *สำคัญ*",
      },
      {
        name: "open",
        type: "boolean",
        default: "false",
        description: "ควบคุมการเปิดและสั่งแสดงผลรายการป๊อปอัปเมนู",
      },
      {
        name: "onClose",
        type: "function",
        default: "-",
        description: "ฟังก์ชันสั่งปิดเมนูเมื่อกดคลิกพื้นที่อื่นภายนอกหน้าต่างเมนู",
      },
    ],
  },
  {
    id: "speed-dial",
    name: "SpeedDial (ปุ่มลอยด่วนย่อย)",
    description:
      "ปุ่มไอคอนลอย (FAB) ที่มุมขวาหรือซ้ายล่าง เมื่อชี้เมาส์หรือกดจะคลี่แตกไอคอนคำสั่งลัดเพิ่มเติมออกมาทันที",
    importCode: `import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';`,
    code: `<SpeedDial
  ariaLabel="SpeedDial basic demo"
  sx={{ position: 'absolute', bottom: 16, right: 16 }}
  icon={<SpeedDialIcon />}
  direction="[direction]"
  hidden={[hidden]}
>
  <SpeedDialAction icon={<FileCopyIcon />} slotProps={{ tooltip: { title: "คัดลอกไฟล์" } }} />
  <SpeedDialAction icon={<SaveIcon />} slotProps={{ tooltip: { title: "บันทึกข้อมูล" } }} />
  <SpeedDialAction icon={<ShareIcon />} slotProps={{ tooltip: { title: "แชร์ความรู้" } }} />
</SpeedDial>`,
    props: [
      {
        name: "direction",
        type: "'up' | 'down' | 'left' | 'right'",
        default: "'up'",
        description: "ทิศทางการคลี่ไอคอนย่อยของ SpeedDialAction (เช่น ทิศทางลอยขึ้น, กางออกขวา)",
      },
      {
        name: "hidden",
        type: "boolean",
        default: "false",
        description: "ซ่อน SpeedDial หลักไม่ให้แสดงบนหน้าจอ",
      },
      {
        name: "open",
        type: "boolean",
        default: "-",
        description: "ควบคุมการกางไอคอนแอคชันย่อยค้างไว้ผ่าน state",
      },
    ],
  },
  {
    id: "divider",
    name: "Divider (เส้นแบ่งสัดส่วน)",
    description:
      "เส้นแบ่งแนวนอนหรือแนวตั้งสีอ่อนบางเบา เพื่อช่วยคั่นระหว่างรายการข้อความ หรือแยกส่วนพื้นที่คอนเทนต์ให้อ่านง่าย",
    importCode: `import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';`,
    code: `<div>
  <Typography>เนื้อหาตอนที่ 1</Typography>
  <Divider 
    orientation="[orientation]" 
    variant="[variant]" 
    textAlign="[textAlign]"
  >
    <Chip label="อ่านต่อ" size="small" />
  </Divider>
  <Typography>เนื้อหาตอนที่ 2</Typography>
</div>`,
    props: [
      {
        name: "orientation",
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: "ทิศทางการขีดเส้นแบ่งสัดส่วน (horizontal = แนวนอน, vertical = แนวตั้ง)",
      },
      {
        name: "variant",
        type: "'fullWidth' | 'inset' | 'middle'",
        default: "'fullWidth'",
        description: "ความยาวของเส้นขีดคั่น (fullWidth = ชนขอบ, inset = เว้นขอบซ้ายนิดหน่อย, middle = หดเว้นทั้งซ้ายและขวา)",
      },
      {
        name: "textAlign",
        type: "'center' | 'left' | 'right'",
        default: "'center'",
        description: "ตำแหน่งการจัดวางเนื้อหาข้อความ/ชิปคั่นกลางเส้น (เช่น กึ่งกลาง, จัดซ้าย, จัดขวา)",
      },
    ],
  },
  {
    id: "grid",
    name: "Grid (การจัดกริดสัดส่วนหน้า)",
    description:
      "ระบบจัดวาง Layout หน้าจอแบบ Grid 12 คอลัมน์ที่รองรับ Responsive ได้ดีเยี่ยม ช่วยแบ่งความกว้างแบบยืดหยุ่น",
    importCode: `import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';`,
    code: `<Grid container spacing={[spacing]}>
  <Grid size={{ xs: 12, md: 6 }}>
    <Paper sx={{ p: 2, textAlign: 'center' }}>ความกว้างเต็มในมือถือ / ครึ่งนึงในคอม</Paper>
  </Grid>
  <Grid size={{ xs: 12, md: 6 }}>
    <Paper sx={{ p: 2, textAlign: 'center' }}>ความกว้างเต็มในมือถือ / ครึ่งนึงในคอม</Paper>
  </Grid>
</Grid>`,
    props: [
      {
        name: "container",
        type: "boolean",
        default: "false",
        description: "กำหนดให้ Grid ชิ้นนี้ทำหน้าที่เป็นตัวแม่ (Flex Container) เพื่อครอบชิ้นลูก",
      },
      {
        name: "spacing",
        type: "number | string",
        default: "0",
        description: "ขนาดระยะห่างระหว่างชิ้นลูกภายในกริดคอนเทนเนอร์ (อ้างอิงตามธีมสเปซซิ่งคูณ เช่น 2 = 16px)",
      },
      {
        name: "size",
        type: "number | object",
        default: "12",
        description: "กำหนดขนาดความกว้าง/จำนวนช่องที่ชิ้นลูกจะครอบครองจากทั้งหมด 12 ช่อง สามารถแยกตามขนาดหน้าจอได้ เช่น {{ xs: 12, md: 6 }}",
      },
    ],
  },
];
