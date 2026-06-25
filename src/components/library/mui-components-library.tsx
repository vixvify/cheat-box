"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Copy,
  Check,
  Search,
  Sliders,
  Code2,
  Info,
  BookOpen,
} from "lucide-react";
import { useLibraryStore } from "@/store/library-store";
import {
  MUI_COMPONENTS_DATA,
  MuiComponentData,
} from "@/core/data/mui-components-data";
import { copyToClipboard } from "@/lib/clipboard";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MailIcon from "@mui/icons-material/Mail";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Slider from "@mui/material/Slider";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Autocomplete from "@mui/material/Autocomplete";
import Pagination from "@mui/material/Pagination";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import Skeleton from "@mui/material/Skeleton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ButtonGroup from "@mui/material/ButtonGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import PrintIcon from "@mui/icons-material/Print";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6",
    },
    background: {
      default: "#000000",
      paper: "#0c0c0c",
    },
    text: {
      primary: "#ffffff",
      secondary: "#a0a0a0",
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#888888",
          "&.Mui-focused": {
            color: "#3b82f6",
          },
          "&.Mui-disabled": {
            color: "#444444",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "&.Mui-disabled": {
            color: "#555555",
            WebkitTextFillColor: "#555555",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#222222",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#444444",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3b82f6",
          },
          "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
            borderColor: "#111111",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "#888888",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0a0a0a",
          border: "1px solid #222222",
          backgroundImage: "none",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "&.Mui-selected": {
            backgroundColor: "#222222",
            "&:hover": {
              backgroundColor: "#2a2a2a",
            },
          },
          "&:hover": {
            backgroundColor: "#161616",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0c0c0c",
          backgroundImage: "none",
          border: "1px solid #222222",
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: "#a0a0a0",
        },
      },
    },
  },
});

export function MuiComponentsLibrary() {
  const { searchQuery } = useLibraryStore();
  const [selectedId, setSelectedId] = useState(MUI_COMPONENTS_DATA[0].id);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedImport, setCopiedImport] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "props">(
    "preview",
  );

  const filteredComponents = useMemo(() => {
    if (!searchQuery) return MUI_COMPONENTS_DATA;
    const query = searchQuery.toLowerCase().trim();
    return MUI_COMPONENTS_DATA.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  useEffect(() => {
    if (filteredComponents.length > 0) {
      const exists = filteredComponents.some((c) => c.id === selectedId);
      if (!exists) {
        setSelectedId(filteredComponents[0].id);
      }
    }
  }, [filteredComponents, selectedId]);

  const activeComp = useMemo(() => {
    return (
      MUI_COMPONENTS_DATA.find((c) => c.id === selectedId) ||
      MUI_COMPONENTS_DATA[0]
    );
  }, [selectedId]);

  const [variant, setVariant] = useState<
    | "contained"
    | "outlined"
    | "text"
    | "filled"
    | "standard"
    | "elevation"
    | "indeterminate"
    | "temporary"
    | "fullWidth"
    | "inset"
    | "middle"
  >("contained");
  const [color, setColor] = useState<
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "inherit"
    | "standard"
  >("primary");
  const [size, setSize] = useState<"small" | "medium" | "large" | number>(
    "medium",
  );
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [label, setLabel] = useState("ชื่อ-นามสกุล");
  const [helperText, setHelperText] = useState("กรุณากรอกข้อมูลภาษาไทย");
  const [fullWidth, setFullWidth] = useState(false);
  const [disableElevation, setDisableElevation] = useState(false);
  const [severity, setSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("success");
  const [badgeCount, setBadgeCount] = useState(4);

  const [selectValue, setSelectValue] = useState(10);
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tabsValue, setTabsValue] = useState(0);

  const [progressValue, setProgressValue] = useState(50);
  const [sliderValue, setSliderValue] = useState(30);
  const [sliderValueLabel, setSliderValueLabel] = useState<"auto" | "on" | "off">(
    "auto",
  );
  const [avatarSrc, setAvatarSrc] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  );
  const [avatarVariant, setAvatarVariant] = useState<
    "circular" | "rounded" | "square"
  >("circular");
  const [tooltipTitle, setTooltipTitle] = useState(
    "คำอธิบายเพิ่มเติมสำหรับการใช้งาน",
  );
  const [tooltipPlacement, setTooltipPlacement] = useState<
    | "bottom"
    | "bottom-end"
    | "bottom-start"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top"
  >("bottom");
  const [tooltipArrow, setTooltipArrow] = useState(true);
  const [accordionExpanded, setAccordionExpanded] = useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState<string | null>(
    "React",
  );
  const [paginationCount, setPaginationCount] = useState(10);
  const [paginationPage, setPaginationPage] = useState(1);
  const [breadcrumbsSeparator, setBreadcrumbsSeparator] = useState("/");
  const [breadcrumbsMaxItems, setBreadcrumbsMaxItems] = useState(4);
  const [ratingValue, setRatingValue] = useState<number | null>(4);
  const [ratingPrecision, setRatingPrecision] = useState(1);
  const [ratingReadOnly, setRatingReadOnly] = useState(false);
  const [skeletonVariant, setSkeletonVariant] = useState<
    "text" | "rectangular" | "rounded" | "circular"
  >("rectangular");
  const [skeletonAnimation, setSkeletonAnimation] = useState<
    "pulse" | "wave" | false
  >("wave");
  const [skeletonWidth, setSkeletonWidth] = useState<string | number>("100%");
  const [skeletonHeight, setSkeletonHeight] = useState<string | number>(118);

  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal",
  );
  const [radioValue, setRadioValue] = useState("female");
  const [dense, setDense] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [alternativeLabel, setAlternativeLabel] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchor, setAnchor] = useState<"left" | "top" | "right" | "bottom">(
    "left",
  );
  const [position, setPosition] = useState<
    "static" | "fixed" | "absolute" | "sticky" | "relative"
  >("static");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [direction, setDirection] = useState<
    "up" | "down" | "left" | "right"
  >("up");
  const [hidden, setHidden] = useState(false);
  const [dividerOrientation, setDividerOrientation] = useState<
    "horizontal" | "vertical"
  >("horizontal");
  const [dividerTextAlign, setDividerTextAlign] = useState<
    "center" | "left" | "right"
  >("center");
  const [gridSpacing, setGridSpacing] = useState(2);
  const [gridItemSize, setGridItemSize] = useState<number>(4);

  useEffect(() => {
    setCopiedCode(false);
    setCopiedImport(false);
    setAnchorEl(null);
    if (activeComp.id === "button") {
      setVariant("contained");
      setColor("primary");
      setSize("medium");
      setDisabled(false);
      setDisableElevation(false);
      setFullWidth(false);
    } else if (activeComp.id === "textfield") {
      setVariant("outlined");
      setColor("primary");
      setSize("medium");
      setDisabled(false);
      setError(false);
      setLabel("ชื่อ-นามสกุล");
      setHelperText("กรุณากรอกข้อมูลภาษาไทย");
      setFullWidth(false);
    } else if (activeComp.id === "select") {
      setVariant("outlined");
      setSize("medium");
      setDisabled(false);
      setFullWidth(false);
    } else if (activeComp.id === "checkbox-switch") {
      setColor("primary");
      setSize("medium");
      setDisabled(false);
      setLabel("ยอมรับเงื่อนไขการใช้งาน");
    } else if (activeComp.id === "card") {
      setVariant("elevation");
      setFullWidth(false);
    } else if (activeComp.id === "dialog") {
      setSize("medium");
      setFullWidth(true);
    } else if (activeComp.id === "table") {
      setVariant("elevation");
      setSize("medium");
    } else if (activeComp.id === "alert") {
      setSeverity("success");
      setVariant("standard");
    } else if (activeComp.id === "badge-chip") {
      setColor("primary");
      setVariant("filled");
      setBadgeCount(4);
    } else if (activeComp.id === "tabs") {
      setColor("primary");
      setFullWidth(false);
      setTabsValue(0);
    } else if (activeComp.id === "progress") {
      setVariant("indeterminate");
      setColor("primary");
      setProgressValue(50);
      setSize(40);
    } else if (activeComp.id === "slider") {
      setSliderValue(30);
      setSliderValueLabel("auto");
      setColor("primary");
      setDisabled(false);
    } else if (activeComp.id === "avatar") {
      setAvatarSrc("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80");
      setAvatarVariant("circular");
      setSize(40);
    } else if (activeComp.id === "tooltip") {
      setTooltipTitle("คำอธิบายเพิ่มเติมสำหรับการใช้งาน");
      setTooltipPlacement("bottom");
      setTooltipArrow(true);
    } else if (activeComp.id === "accordion") {
      setVariant("elevation");
      setAccordionExpanded(false);
      setDisabled(false);
    } else if (activeComp.id === "autocomplete") {
      setLabel("เลือกหัวข้อหลัก");
      setAutocompleteValue("React");
      setDisabled(false);
    } else if (activeComp.id === "pagination") {
      setPaginationCount(10);
      setPaginationPage(1);
      setColor("standard");
      setVariant("text");
      setAvatarVariant("circular");
    } else if (activeComp.id === "breadcrumbs") {
      setBreadcrumbsSeparator("/");
      setBreadcrumbsMaxItems(4);
    } else if (activeComp.id === "rating") {
      setRatingValue(4);
      setRatingPrecision(1);
      setSize("medium");
      setDisabled(false);
      setRatingReadOnly(false);
    } else if (activeComp.id === "skeleton") {
      setSkeletonVariant("rectangular");
      setSkeletonAnimation("wave");
      setSkeletonWidth("100%");
      setSkeletonHeight(118);
    } else if (activeComp.id === "button-group") {
      setVariant("outlined");
      setColor("primary");
      setSize("medium");
      setOrientation("horizontal");
      setDisabled(false);
    } else if (activeComp.id === "radio-group") {
      setRadioValue("female");
      setColor("primary");
      setLabel("ระบุเพศของคุณ");
      setDisabled(false);
      setAlternativeLabel(false); // row property for radio buttons
    } else if (activeComp.id === "list") {
      setDense(false);
    } else if (activeComp.id === "stepper") {
      setActiveStep(0);
      setAlternativeLabel(false);
      setOrientation("horizontal");
    } else if (activeComp.id === "drawer") {
      setAnchor("left");
      setDrawerOpen(false);
      setVariant("temporary");
    } else if (activeComp.id === "appbar") {
      setPosition("static");
      setColor("primary");
    } else if (activeComp.id === "menu") {
      setDrawerOpen(false); // open state for menu is handled by anchorEl, but we can reuse state
    } else if (activeComp.id === "speed-dial") {
      setDirection("up");
      setHidden(false);
    } else if (activeComp.id === "divider") {
      setDividerOrientation("horizontal");
      setVariant("fullWidth");
      setDividerTextAlign("center");
    } else if (activeComp.id === "grid") {
      setGridSpacing(2);
      setGridItemSize(4);
    }
  }, [activeComp.id]);

  const dynamicCode = useMemo(() => {
    switch (activeComp.id) {
      case "button":
        return `<Button
  variant="${variant}"
  color="${color}"
  size="${size}"${disabled ? "\n  disabled" : ""}${disableElevation ? "\n  disableElevation" : ""}${fullWidth ? "\n  fullWidth" : ""}
>
  Click Me
</Button>`;

      case "textfield":
        return `<TextField
  label="${label}"
  variant="${variant}"
  color="${color}"
  size="${size}"${error ? "\n  error" : ""}${disabled ? "\n  disabled" : ""}${fullWidth ? "\n  fullWidth" : ""}
  helperText="${helperText}"
  placeholder="กรอกข้อมูล..."
/>`;

      case "select":
        return `<FormControl${fullWidth ? " fullWidth" : ""} size="${size}">
  <InputLabel id="demo-select-label">ตัวเลือก</InputLabel>
  <Select
    labelId="demo-select-label"
    id="demo-select"
    value={value}
    label="ตัวเลือก"
    onChange={handleChange}
    variant="${variant}"${disabled ? "\n    disabled" : ""}
  >
    <MenuItem value={10}>ตัวเลือกที่ 1</MenuItem>
    <MenuItem value={20}>ตัวเลือกที่ 2</MenuItem>
    <MenuItem value={30}>ตัวเลือกที่ 3</MenuItem>
  </Select>
</FormControl>`;

      case "checkbox-switch":
        return `<FormGroup>
  <FormControlLabel
    control={
      <Checkbox
        checked={checkboxChecked}
        color="${color}"
        size="${size === "large" ? "medium" : size}"${disabled ? "\n        disabled" : ""}
      />
    }
    label="${label} (Checkbox)"
  />
  <FormControlLabel
    control={
      <Switch
        checked={switchChecked}
        color="${color}"
        size="${size === "large" ? "medium" : size}"${disabled ? "\n        disabled" : ""}
      />
    }
    label="${label} (Switch)"
  />
</FormGroup>`;

      case "card":
        return `<Card sx={{ maxWidth: ${fullWidth ? "'100%'" : "345"} }} variant="${variant}">
  <CardMedia
    sx={{ height: 140 }}
    image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    title="Red Shoes"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      รองเท้าวิ่งผ้าใบสีแดง
    </Typography>
    <Typography variant="body2" color="text.secondary">
      รองเท้ากีฬาคุณภาพสูง ทนทาน น้ำหนักเบา รองรับแรงกระแทกได้ดีเยี่ยม เหมาะสำหรับสวมใส่ออกกำลังกายในทุกวัน
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">รายละเอียด</Button>
    <Button size="small">แชร์</Button>
  </CardActions>
</Card>`;

      case "dialog":
        return `<Dialog
  open={open}
  onClose={handleClose}
  fullWidth={${fullWidth}}
  maxWidth="${size === "small" ? "xs" : size === "large" ? "md" : "sm"}"
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
</Dialog>`;

      case "table":
        return `<TableContainer component={Paper} variant="${variant}">
  <Table sx={{ minWidth: 350 }} size="${size === "large" ? "medium" : size}">
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
</TableContainer>`;

      case "alert":
        return `<Alert severity="${severity}" variant="${variant}" onClose={handleClose}>
  <AlertTitle>แจ้งเตือน</AlertTitle>
  นี่คือข้อความตัวอย่างสำหรับใช้อธิบายสถานะระบบ
</Alert>`;

      case "badge-chip":
        return `<div>
  <Badge badgeContent={${badgeCount}} color="${color}" max={99}>
    <MailIcon color="action" />
  </Badge>
  
  <Chip
    label="MUI Chip"
    variant="${variant}"
    color="${color}"
  />
  <Chip
    label="Deletable Chip"
    variant="${variant}"
    color="${color}"
    onDelete={handleDelete}
  />
</div>`;

      case "tabs":
        return `<Box sx={{ width: '100%' }}>
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Tabs
      value={value}
      onChange={handleChange}
      textColor="${color === "default" ? "inherit" : color}"
      indicatorColor="${color === "default" || color === "inherit" ? "primary" : color}"
      centered={${fullWidth}}
    >
      <Tab label="แท็บที่ 1" />
      <Tab label="แท็บที่ 2" />
      <Tab label="แท็บที่ 3" />
    </Tabs>
  </Box>
</Box>`;

      case "progress":
        return `<Box sx={{ width: '100%' }}>
  <CircularProgress
    variant="${variant}"
    color="${color}"
    value={${progressValue}}
    size={${size}}
  />

  <LinearProgress
    variant="${variant}"
    color="${color}"
    value={${progressValue}}
    sx={{ mt: 2 }}
  />
</Box>`;

      case "slider":
        return `<Slider
  value={${sliderValue}}
  min={0}
  max={100}
  step={10}
  color="${color}"
  disabled={${disabled}}
  valueLabelDisplay="${sliderValueLabel}"
/>`;

      case "avatar":
        return `<AvatarGroup max={4}>
  <Avatar
    alt="User Profile"
    src="${avatarSrc}"
    variant="${avatarVariant}"
    sx={{ width: ${size}, height: ${size} }}
  />
  <Avatar variant="${avatarVariant}" sx={{ bgcolor: 'secondary.main', width: ${size}, height: ${size} }}>OP</Avatar>
  <Avatar variant="${avatarVariant}" sx={{ bgcolor: 'primary.main', width: ${size}, height: ${size} }}>UI</Avatar>
</AvatarGroup>`;

      case "tooltip":
        return `<Tooltip
  title="${tooltipTitle}"
  placement="${tooltipPlacement}"
  arrow={${tooltipArrow}}
>
  <Button variant="outlined">Hover Me</Button>
</Tooltip>`;

      case "accordion":
        return `<Accordion variant="${variant}" disabled={${disabled}}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography font-weight="bold">หัวข้อส่วนที่ 1</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>รายละเอียดข้อมูลสรุปเนื้อหารายการต่างๆ ที่ต้องการยุบขยาย</Typography>
  </AccordionDetails>
</Accordion>`;

      case "autocomplete":
        return `<Autocomplete
  options={["React", "Next.js", "Tailwind CSS", "Material UI", "TypeScript"]}
  value="${autocompleteValue}"
  disabled={${disabled}}
  renderInput={(params) => (
    <TextField {...params} label="${label}" variant="outlined" />
  )}
/>`;

      case "pagination":
        return `<Pagination
  count={${paginationCount}}
  page={${paginationPage}}
  color="${color}"
  variant="${variant}"
  shape="${avatarVariant}"
/>`;

      case "breadcrumbs":
        return `<Breadcrumbs separator="${breadcrumbsSeparator}" maxItems={${breadcrumbsMaxItems}}>
  <Link href="#" underline="hover" color="inherit">หน้าแรก</Link>
  <Link href="#" underline="hover" color="inherit">หมวดหมู่สินค้า</Link>
  <Typography color="text.primary">หน้าปัจจุบัน</Typography>
</Breadcrumbs>`;

      case "rating":
        return `<Rating
  name="custom-rating"
  value={${ratingValue}}
  precision={${ratingPrecision}}
  size="${size}"
  disabled={${disabled}}
  readOnly={${ratingReadOnly}}
/>`;

      case "skeleton":
        return `<Skeleton
  variant="${skeletonVariant}"
  animation="${skeletonAnimation}"
  width="${skeletonWidth}"
  height={${skeletonHeight}}
/>`;

      case "button-group":
        return `<ButtonGroup
  variant="${variant}"
  color="${color}"
  orientation="${orientation}"
  size="${size}"
  disabled={${disabled}}
>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>`;

      case "radio-group":
        return `<FormControl>
  <FormLabel id="demo-radio-buttons-group-label">${label}</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    value={value}
    onChange={handleChange}
    row={${alternativeLabel}}
  >
    <FormControlLabel value="female" control={<Radio color="${color}" disabled={${disabled}} />} label="ผู้หญิง" />
    <FormControlLabel value="male" control={<Radio color="${color}" disabled={${disabled}} />} label="ผู้ชาย" />
    <FormControlLabel value="other" control={<Radio color="${color}" disabled={${disabled}} />} label="อื่นๆ" />
  </RadioGroup>
</FormControl>`;

      case "list":
        return `<List dense={${dense}} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
  <ListItem disablePadding>
    <ListItemButton>
      <ListItemIcon>
        <MailIcon />
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
</List>`;

      case "stepper":
        return `<Box sx={{ width: '100%' }}>
  <Stepper activeStep={${activeStep}} alternativeLabel={${alternativeLabel}} orientation="${orientation}">
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
</Box>`;

      case "drawer":
        return `<Drawer
  anchor="${anchor}"
  open={open}
  onClose={handleClose}
  variant="${variant}"
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
</Drawer>`;

      case "appbar":
        return `<AppBar position="${position}" color="${color}">
  <Toolbar>
    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      Dev Library
    </Typography>
    <Button color="inherit">เข้าสู่ระบบ</Button>
  </Toolbar>
</AppBar>`;

      case "menu":
        return `<div>
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
</div>`;

      case "speed-dial":
        return `<SpeedDial
  ariaLabel="SpeedDial basic demo"
  sx={{ position: 'absolute', bottom: 16, right: 16 }}
  icon={<SpeedDialIcon />}
  direction="${direction}"
  hidden={${hidden}}
>
  <SpeedDialAction icon={<FileCopyIcon />} slotProps={{ tooltip: { title: "คัดลอกไฟล์" } }} />
  <SpeedDialAction icon={<SaveIcon />} slotProps={{ tooltip: { title: "บันทึกข้อมูล" } }} />
  <SpeedDialAction icon={<ShareIcon />} slotProps={{ tooltip: { title: "แชร์ความรู้" } }} />
</SpeedDial>`;

      case "divider":
        return `<div>
  <Typography>เนื้อหาตอนที่ 1</Typography>
  <Divider
    orientation="${dividerOrientation}"
    variant="${variant}"
    textAlign="${dividerTextAlign}"
  >
    <Chip label="อ่านต่อ" size="small" />
  </Divider>
  <Typography>เนื้อหาตอนที่ 2</Typography>
</div>`;

      case "grid": {
        const itemsCount = 12 / gridItemSize;
        const itemsCode = Array.from({ length: itemsCount })
          .map(
            (_, idx) => `  <Grid size={${gridItemSize}}>
    <Paper sx={{ p: 2, textAlign: 'center' }}>Size = ${gridItemSize}</Paper>
  </Grid>`
          )
          .join("\n");
        return `<Grid container spacing={${gridSpacing}}>
${itemsCode}
</Grid>`;
      }

      default:
        return "";
    }
  }, [
    activeComp.id,
    variant,
    color,
    size,
    disabled,
    disableElevation,
    fullWidth,
    label,
    error,
    helperText,
    checkboxChecked,
    switchChecked,
    dialogOpen,
    severity,
    badgeCount,
    progressValue,
    sliderValue,
    sliderValueLabel,
    avatarSrc,
    avatarVariant,
    tooltipTitle,
    tooltipPlacement,
    tooltipArrow,
    accordionExpanded,
    autocompleteValue,
    paginationCount,
    paginationPage,
    breadcrumbsSeparator,
    breadcrumbsMaxItems,
    ratingValue,
    ratingPrecision,
    ratingReadOnly,
    skeletonVariant,
    skeletonAnimation,
    skeletonWidth,
    skeletonHeight,
    orientation,
    radioValue,
    dense,
    activeStep,
    alternativeLabel,
    drawerOpen,
    anchor,
    position,
    direction,
    hidden,
    dividerOrientation,
    dividerTextAlign,
    gridSpacing,
    gridItemSize,
  ]);

  const handleCopyCode = useCallback(async () => {
    const success = await copyToClipboard(dynamicCode);
    if (success) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  }, [dynamicCode]);

  const handleCopyImport = useCallback(async () => {
    const success = await copyToClipboard(activeComp.importCode);
    if (success) {
      setCopiedImport(true);
      setTimeout(() => setCopiedImport(false), 2000);
    }
  }, [activeComp.importCode]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="flex h-[calc(100vh-90px)] gap-6 overflow-hidden">
      
      <div className="flex w-64 shrink-0 flex-col rounded border border-[#222] bg-[#0c0c0c]">
        <div className="border-b border-[#222] px-4 py-3 flex items-center gap-2">
          <BookOpen size={14} className="text-[#888]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#bbb]">
            Components
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
          {filteredComponents.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#555]">
              ไม่มีข้อมูลที่ค้นหา
            </div>
          ) : (
            filteredComponents.map((c) => {
              const isSel = c.id === selectedId;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedId(c.id);
                    if (c.id === "button") {
                      setVariant("contained");
                      setColor("primary");
                      setSize("medium");
                      setDisabled(false);
                      setDisableElevation(false);
                      setFullWidth(false);
                    } else if (c.id === "textfield") {
                      setVariant("outlined");
                      setColor("primary");
                      setSize("medium");
                      setDisabled(false);
                      setError(false);
                      setLabel("ชื่อ-นามสกุล");
                      setHelperText("กรุณากรอกข้อมูลภาษาไทย");
                      setFullWidth(false);
                    } else if (c.id === "select") {
                      setVariant("outlined");
                      setSize("medium");
                      setDisabled(false);
                      setFullWidth(false);
                    } else if (c.id === "checkbox-switch") {
                      setColor("primary");
                      setSize("medium");
                      setDisabled(false);
                      setLabel("ยอมรับเงื่อนไขการใช้งาน");
                    } else if (c.id === "card") {
                      setVariant("elevation");
                      setFullWidth(false);
                    } else if (c.id === "dialog") {
                      setSize("medium");
                      setFullWidth(true);
                    } else if (c.id === "table") {
                      setVariant("elevation");
                      setSize("medium");
                    } else if (c.id === "alert") {
                      setSeverity("success");
                      setVariant("standard");
                    } else if (c.id === "badge-chip") {
                      setColor("primary");
                      setVariant("filled");
                      setBadgeCount(4);
                    } else if (c.id === "tabs") {
                      setColor("primary");
                      setFullWidth(false);
                      setTabsValue(0);
                    }
                  }}
                  className={`flex w-full cursor-pointer items-center justify-between rounded px-3 py-2 text-left transition-colors ${
                    isSel
                      ? "bg-white/10 text-white font-medium"
                      : "text-[#888] hover:bg-white/5 hover:text-[#ddd]"
                  }`}
                >
                  <span className="text-sm truncate">{c.name}</span>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto space-y-5 pr-2">
        
        <div className="rounded border border-[#222] bg-[#0f0f0f] p-5">
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                {activeComp.name}
              </h3>
              <p className="text-sm text-[#888] leading-relaxed max-w-4xl">
                {activeComp.description}
              </p>
            </div>
            <div className="flex flex-col gap-2 max-w-3xl">
              <div className="text-xs font-medium text-[#555]">
                Import Statement:
              </div>
              <div className="flex items-start justify-between gap-1.5 rounded border border-[#1e1e1e] bg-black px-3 py-2">
                <code className="font-mono text-xs text-green-500 whitespace-pre-wrap break-all leading-normal flex-1">
                  {activeComp.importCode}
                </code>
                <button
                  onClick={handleCopyImport}
                  className="ml-1 shrink-0 cursor-pointer rounded p-1 text-[#666] hover:bg-[#111] hover:text-white transition-colors"
                  title="Copy import statement"
                >
                  {copiedImport ? (
                    <Check size={13} className="text-green-500" />
                  ) : (
                    <Copy size={13} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          <div className="lg:col-span-8 flex flex-col rounded border border-[#222] bg-[#0f0f0f] overflow-hidden min-h-[350px]">
            
            <div className="flex border-b border-[#222] bg-[#0c0c0c] px-3">
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex cursor-pointer items-center gap-1.5 border-b-2 px-3 py-3 text-xs font-medium transition-colors ${
                  activeTab === "preview"
                    ? "border-white text-white"
                    : "border-transparent text-[#666] hover:text-[#bbb]"
                }`}
              >
                <Sliders size={13} />
                Preview & Interact
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`flex cursor-pointer items-center gap-1.5 border-b-2 px-3 py-3 text-xs font-medium transition-colors ${
                  activeTab === "code"
                    ? "border-white text-white"
                    : "border-transparent text-[#666] hover:text-[#bbb]"
                }`}
              >
                <Code2 size={13} />
                Dynamic Code
              </button>
              <button
                onClick={() => setActiveTab("props")}
                className={`flex cursor-pointer items-center gap-1.5 border-b-2 px-3 py-3 text-xs font-medium transition-colors ${
                  activeTab === "props"
                    ? "border-white text-white"
                    : "border-transparent text-[#666] hover:text-[#bbb]"
                }`}
              >
                <Info size={13} />
                Props (TH)
              </button>
            </div>

            <div className="flex-1 p-8 flex items-center justify-center bg-black/40 min-h-[250px]">
              {activeTab === "preview" && (
                <div className="w-full flex items-center justify-center p-4">
                  
                  {activeComp.id === "button" && (
                    <Button
                      variant={variant}
                      color={color}
                      size={size}
                      disabled={disabled}
                      disableElevation={disableElevation}
                      fullWidth={fullWidth}
                    >
                      Click Me
                    </Button>
                  )}

                  {activeComp.id === "textfield" && (
                    <div className="w-full max-w-sm">
                      <TextField
                        label={label}
                        variant={variant === "contained" || variant === "text" ? "outlined" : variant}
                        color={color}
                        size={size}
                        error={error}
                        disabled={disabled}
                        fullWidth={fullWidth}
                        helperText={helperText}
                        placeholder="กรอกข้อมูล..."
                      />
                    </div>
                  )}

                  {activeComp.id === "select" && (
                    <div className="w-full max-w-xs">
                      <FormControl fullWidth={fullWidth} size={size}>
                        <InputLabel id="preview-select-label">
                          ตัวเลือก
                        </InputLabel>
                        <Select
                          labelId="preview-select-label"
                          id="preview-select"
                          value={selectValue}
                          label="ตัวเลือก"
                          onChange={(e) =>
                            setSelectValue(Number(e.target.value))
                          }
                          variant={variant === "contained" || variant === "text" ? "outlined" : variant}
                          disabled={disabled}
                        >
                          <MenuItem value={10}>ตัวเลือกที่ 1</MenuItem>
                          <MenuItem value={20}>ตัวเลือกที่ 2</MenuItem>
                          <MenuItem value={30}>ตัวเลือกที่ 3</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  )}

                  {activeComp.id === "checkbox-switch" && (
                    <FormGroup className="flex flex-col gap-2">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkboxChecked}
                            onChange={(e) =>
                              setCheckboxChecked(e.target.checked)
                            }
                            color={color}
                            size={size === "large" ? "medium" : size}
                            disabled={disabled}
                          />
                        }
                        label={`${label} (Checkbox)`}
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={switchChecked}
                            onChange={(e) => setSwitchChecked(e.target.checked)}
                            color={color}
                            size={size === "large" ? "medium" : size}
                            disabled={disabled}
                          />
                        }
                        label={`${label} (Switch)`}
                      />
                    </FormGroup>
                  )}

                  {activeComp.id === "card" && (
                    <Card
                      sx={{ maxWidth: fullWidth ? "100%" : 300 }}
                      variant={variant === "outlined" ? "outlined" : "elevation"}
                      className="bg-[#0f0f0f] border border-[#222]"
                    >
                      <CardMedia
                        sx={{ height: 120 }}
                        image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80"
                        title="Red Shoes"
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ color: "text.primary" }}
                        >
                          รองเท้ากีฬาผ้าใบสีแดง
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          รองเท้าวิ่งคุณภาพสูง ทนทาน น้ำหนักเบา
                        </Typography>
                      </CardContent>
                      <CardActions className="border-t border-[#1e1e1e] mt-2">
                        <Button size="small" className="cursor-pointer">
                          รายละเอียด
                        </Button>
                        <Button size="small" className="cursor-pointer">
                          แชร์
                        </Button>
                      </CardActions>
                    </Card>
                  )}

                  {activeComp.id === "dialog" && (
                    <div className="flex flex-col items-center gap-3">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setDialogOpen(true)}
                        className="cursor-pointer"
                      >
                        เปิด Dialog หน้าต่างจำลอง
                      </Button>
                      <Dialog
                        open={dialogOpen}
                        onClose={() => setDialogOpen(false)}
                        fullWidth={fullWidth}
                        maxWidth={
                          size === "small"
                            ? "xs"
                            : size === "large"
                              ? "md"
                              : "sm"
                        }
                      >
                        <DialogTitle>ยืนยันการทำรายการ?</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            คุณแน่ใจหรือไม่ว่าต้องการบันทึกข้อมูลนี้ลงในระบบ?
                            การทำรายการนี้อาจใช้เวลาสักครู่
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={() => setDialogOpen(false)}
                            color="inherit"
                            className="cursor-pointer"
                          >
                            ยกเลิก
                          </Button>
                          <Button
                            onClick={() => setDialogOpen(false)}
                            variant="contained"
                            color="success"
                            className="cursor-pointer"
                            autoFocus
                          >
                            ตกลง
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  )}

                  {activeComp.id === "table" && (
                    <TableContainer
                      component={Paper}
                      variant={variant === "outlined" ? "outlined" : "elevation"}
                      sx={{
                        backgroundColor: "#080808",
                        border: "1px solid #1e1e1e",
                      }}
                    >
                      <Table
                        size={size === "large" ? "medium" : size}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow sx={{ borderBottom: "2px solid #1e1e1e" }}>
                            <TableCell
                              sx={{ color: "#fff", fontWeight: "bold" }}
                            >
                              ชื่อสินค้า
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ color: "#fff", fontWeight: "bold" }}
                            >
                              จำนวน
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ color: "#fff", fontWeight: "bold" }}
                            >
                              ราคา (฿)
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow sx={{ borderBottom: "1px solid #1c1c1c" }}>
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ color: "#aaa" }}
                            >
                              เสื้อเชิ้ตลายตาราง
                            </TableCell>
                            <TableCell align="right" sx={{ color: "#aaa" }}>
                              2
                            </TableCell>
                            <TableCell align="right" sx={{ color: "#aaa" }}>
                              790
                            </TableCell>
                          </TableRow>
                          <TableRow sx={{ border: 0 }}>
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ color: "#aaa" }}
                            >
                              กางเกงสแล็คสีดำ
                            </TableCell>
                            <TableCell align="right" sx={{ color: "#aaa" }}>
                              1
                            </TableCell>
                            <TableCell align="right" sx={{ color: "#aaa" }}>
                              1,200
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}

                  {activeComp.id === "alert" && (
                    <Alert
                      severity={severity}
                      variant={variant === "contained" || variant === "text" ? "standard" : variant}
                      sx={{ width: "100%" }}
                      onClose={() => alert("คลิกปิด Alert")}
                    >
                      <AlertTitle>แจ้งเตือน</AlertTitle>
                      นี่คือข้อความตัวอย่างสำหรับใช้อธิบายสถานะระบบ
                    </Alert>
                  )}

                  {activeComp.id === "badge-chip" && (
                    <div className="flex flex-col gap-6 items-center">
                      <div className="flex gap-2">
                        <Badge badgeContent={badgeCount} color={color} max={99}>
                          <MailIcon sx={{ color: "#bbb" }} />
                        </Badge>
                        <div className="flex gap-1 ml-4 border border-[#222] bg-[#111] rounded px-1">
                          <button
                            onClick={() =>
                              setBadgeCount((c) => Math.max(0, c - 1))
                            }
                            className="cursor-pointer text-xs font-semibold text-[#888] hover:text-white px-2 py-0.5"
                          >
                            -
                          </button>
                          <button
                            onClick={() => setBadgeCount((c) => c + 1)}
                            className="cursor-pointer text-xs font-semibold text-[#888] hover:text-white px-2 py-0.5"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <Chip
                          label="MUI Chip"
                          variant={variant === "outlined" ? "outlined" : "filled"}
                          color={color === "inherit" ? "default" : color}
                        />
                        <Chip
                          label="Deletable Chip"
                          variant={variant === "outlined" ? "outlined" : "filled"}
                          color={color === "inherit" ? "default" : color}
                          onDelete={() => alert("ลบ Chip เรียบร้อย")}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

                  {activeComp.id === "tabs" && (
                    <Box
                      sx={{
                        width: "100%",
                        bgcolor: "#080808",
                        border: "1px solid #1e1e1e",
                        borderRadius: 1,
                        p: 2,
                      }}
                    >
                      <Box sx={{ borderBottom: 1, borderColor: "#1e1e1e" }}>
                        <Tabs
                          value={tabsValue}
                          onChange={(e, nv) => setTabsValue(nv)}
                          textColor={color === "default" ? "inherit" : color}
                          indicatorColor={
                            color === "default" || color === "inherit"
                              ? "primary"
                              : color
                          }
                          centered={fullWidth}
                        >
                          <Tab
                            label="ข้อมูลทั่วไป"
                            sx={{
                              color: "#888",
                              "&.Mui-selected": { color: "#fff" },
                            }}
                          />
                          <Tab
                            label="ข้อมูลผู้ใช้"
                            sx={{
                              color: "#888",
                              "&.Mui-selected": { color: "#fff" },
                            }}
                          />
                          <Tab
                            label="การตั้งค่า"
                            sx={{
                              color: "#888",
                              "&.Mui-selected": { color: "#fff" },
                            }}
                          />
                        </Tabs>
                      </Box>
                      <div className="mt-4 text-xs text-[#888] text-center min-h-[24px]">
                        {tabsValue === 0 &&
                          "หน้าแรก: แหล่งรวมข้อมูลสรุปและการประมวลผลพื้นฐาน"}
                        {tabsValue === 1 &&
                          "หน้าสอง: จัดการรายละเอียดบัญชีและข้อมูลผู้ใช้งาน"}
                        {tabsValue === 2 &&
                          "หน้าสาม: ตั้งค่าความเป็นส่วนตัว เครือข่าย และ API"}
                      </div>
                    </Box>
                  )}

                  {activeComp.id === "progress" && (
                    <Box sx={{ width: "100%", maxWidth: 300, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                      <CircularProgress
                        variant={variant === "determinate" ? "determinate" : "indeterminate"}
                        color={color}
                        value={variant === "determinate" ? progressValue : undefined}
                        size={size === "small" ? 30 : size === "large" ? 60 : 40}
                      />
                      <LinearProgress
                        variant={variant === "determinate" ? "determinate" : "indeterminate"}
                        color={color}
                        value={variant === "determinate" ? progressValue : undefined}
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  )}

                  {activeComp.id === "slider" && (
                    <Box sx={{ width: "100%", maxWidth: 300 }}>
                      <Slider
                        value={sliderValue}
                        onChange={(e, nv) => setSliderValue(nv as number)}
                        min={0}
                        max={100}
                        step={10}
                        color={color}
                        disabled={disabled}
                        valueLabelDisplay={sliderValueLabel}
                      />
                    </Box>
                  )}

                  {activeComp.id === "avatar" && (
                    <AvatarGroup max={4}>
                      <Avatar
                        alt="User Profile"
                        src={avatarSrc}
                        variant={avatarVariant}
                        sx={{
                          width: size === "small" ? 32 : size === "large" ? 56 : 40,
                          height: size === "small" ? 32 : size === "large" ? 56 : 40,
                        }}
                      />
                      <Avatar
                        variant={avatarVariant}
                        sx={{
                          bgcolor: "secondary.main",
                          width: size === "small" ? 32 : size === "large" ? 56 : 40,
                          height: size === "small" ? 32 : size === "large" ? 56 : 40,
                          fontSize: size === "small" ? "12px" : size === "large" ? "20px" : "15px",
                        }}
                      >
                        OP
                      </Avatar>
                      <Avatar
                        variant={avatarVariant}
                        sx={{
                          bgcolor: "primary.main",
                          width: size === "small" ? 32 : size === "large" ? 56 : 40,
                          height: size === "small" ? 32 : size === "large" ? 56 : 40,
                          fontSize: size === "small" ? "12px" : size === "large" ? "20px" : "15px",
                        }}
                      >
                        UI
                      </Avatar>
                    </AvatarGroup>
                  )}

                  {activeComp.id === "tooltip" && (
                    <Tooltip
                      title={tooltipTitle}
                      placement={tooltipPlacement}
                      arrow={tooltipArrow}
                    >
                      <Button variant="outlined" className="cursor-pointer">
                        Hover Me
                      </Button>
                    </Tooltip>
                  )}

                  {activeComp.id === "accordion" && (
                    <Box sx={{ width: "100%", maxWidth: 400 }}>
                      <Accordion
                        variant={variant === "outlined" ? "outlined" : "elevation"}
                        disabled={disabled}
                        expanded={accordionExpanded}
                        onChange={() => setAccordionExpanded(!accordionExpanded)}
                        sx={{ backgroundColor: "#0c0c0c", border: variant === "outlined" ? "1px solid #222" : "none" }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#888" }} />}>
                          <Typography sx={{ fontWeight: "bold" }}>หัวข้อหลักส่วนที่ 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ borderTop: "1px solid #1e1e1e" }}>
                          <Typography sx={{ color: "text.secondary" }}>
                            รายละเอียดข้อมูลสรุปเนื้อหารายการต่างๆ ที่ต้องการยุบขยาย สามารถประยุกต์ใช้งานได้ตามความเหมาะสม
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  )}

                  {activeComp.id === "autocomplete" && (
                    <Box sx={{ width: "100%", maxWidth: 300 }}>
                      <Autocomplete
                        options={["React", "Next.js", "Tailwind CSS", "Material UI", "TypeScript"]}
                        value={autocompleteValue}
                        onChange={(e, nv) => setAutocompleteValue(nv)}
                        disabled={disabled}
                        renderInput={(params) => (
                          <TextField {...params} label={label} variant="outlined" />
                        )}
                      />
                    </Box>
                  )}

                  {activeComp.id === "pagination" && (
                    <Pagination
                      count={paginationCount}
                      page={paginationPage}
                      onChange={(e, p) => setPaginationPage(p)}
                      color={color === "standard" ? "standard" : color}
                      variant={variant === "outlined" ? "outlined" : "text"}
                      shape={avatarVariant}
                    />
                  )}

                  {activeComp.id === "breadcrumbs" && (
                    <Breadcrumbs separator={breadcrumbsSeparator} maxItems={breadcrumbsMaxItems}>
                      <Link href="#" underline="hover" sx={{ color: "primary.main" }} onClick={(e) => e.preventDefault()}>
                        หน้าแรก
                      </Link>
                      <Link href="#" underline="hover" sx={{ color: "primary.main" }} onClick={(e) => e.preventDefault()}>
                        หมวดหมู่สินค้า
                      </Link>
                      <Typography sx={{ color: "text.primary" }}>
                        หน้าปัจจุบัน
                      </Typography>
                    </Breadcrumbs>
                  )}

                  {activeComp.id === "rating" && (
                    <Rating
                      name="interactive-rating"
                      value={ratingValue}
                      onChange={(e, nv) => setRatingValue(nv)}
                      precision={ratingPrecision}
                      size={size}
                      disabled={disabled}
                      readOnly={ratingReadOnly}
                    />
                  )}

                  {activeComp.id === "skeleton" && (
                    <Box sx={{ width: "100%", maxWidth: 300, display: "flex", flexDirection: "column", gap: 2 }}>
                      <Skeleton
                        variant={skeletonVariant}
                        animation={skeletonAnimation === "false" ? false : skeletonAnimation}
                        width={skeletonWidth}
                        height={skeletonHeight}
                      />
                    </Box>
                  )}

                  {activeComp.id === "button-group" && (
                    <ButtonGroup
                      variant={variant}
                      color={color}
                      orientation={orientation}
                      size={size}
                      disabled={disabled}
                    >
                      <Button>One</Button>
                      <Button>Two</Button>
                      <Button>Three</Button>
                    </ButtonGroup>
                  )}

                  {activeComp.id === "radio-group" && (
                    <FormControl>
                      <FormLabel id="interactive-radio-buttons-group-label" sx={{ mb: 1, color: "text.secondary" }}>
                        {label}
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="interactive-radio-buttons-group-label"
                        value={radioValue}
                        onChange={(e) => setRadioValue(e.target.value)}
                        row={alternativeLabel}
                      >
                        <FormControlLabel value="female" control={<Radio color={color} disabled={disabled} />} label="ผู้หญิง" />
                        <FormControlLabel value="male" control={<Radio color={color} disabled={disabled} />} label="ผู้ชาย" />
                        <FormControlLabel value="other" control={<Radio color={color} disabled={disabled} />} label="อื่นๆ" />
                      </RadioGroup>
                    </FormControl>
                  )}

                  {activeComp.id === "list" && (
                    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", borderRadius: 1, border: "1px solid #222" }}>
                      <List dense={dense}>
                        <ListItem disablePadding>
                          <ListItemButton onClick={() => alert("คลิก กล่องข้อความเข้า")}>
                            <ListItemIcon sx={{ color: "primary.main" }}>
                              <MailIcon />
                            </ListItemIcon>
                            <ListItemText primary="กล่องข้อความเข้า" secondary="มีอีเมลใหม่ 3 ฉบับ" />
                          </ListItemButton>
                        </ListItem>
                        <Divider sx={{ borderColor: "#222" }} />
                        <ListItem disablePadding>
                          <ListItemButton onClick={() => alert("คลิก ถังขยะ")}>
                            <ListItemText primary="ถังขยะ" />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Box>
                  )}

                  {activeComp.id === "stepper" && (
                    <Box sx={{ width: "100%" }}>
                      <Stepper activeStep={activeStep} alternativeLabel={alternativeLabel} orientation={orientation}>
                        <Step>
                          <StepLabel sx={{ "& .MuiStepLabel-label": { color: activeStep === 0 ? "primary.main" : "#888" } }}>กรอกที่อยู่ผู้รับ</StepLabel>
                        </Step>
                        <Step>
                          <StepLabel sx={{ "& .MuiStepLabel-label": { color: activeStep === 1 ? "primary.main" : "#888" } }}>ชำระเงินออนไลน์</StepLabel>
                        </Step>
                        <Step>
                          <StepLabel sx={{ "& .MuiStepLabel-label": { color: activeStep === 2 ? "primary.main" : "#888" } }}>ยืนยันคำสั่งซื้อ</StepLabel>
                        </Step>
                      </Stepper>
                      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
                        <Button
                          disabled={activeStep === 0}
                          onClick={() => setActiveStep((prev) => prev - 1)}
                          variant="outlined"
                          size="small"
                          className="cursor-pointer"
                        >
                          ย้อนกลับ
                        </Button>
                        <Button
                          disabled={activeStep === 2}
                          onClick={() => setActiveStep((prev) => prev + 1)}
                          variant="contained"
                          size="small"
                          className="cursor-pointer"
                        >
                          ถัดไป
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {activeComp.id === "drawer" && (
                    <div className="flex flex-col items-center gap-3">
                      <Button
                        variant="contained"
                        onClick={() => setDrawerOpen(true)}
                        className="cursor-pointer"
                      >
                        เปิด Drawer สไลด์ข้าง
                      </Button>
                      <Drawer
                        anchor={anchor}
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        variant={variant === "elevation" ? "temporary" : variant}
                        sx={{
                          "& .MuiDrawer-paper": {
                            backgroundColor: "#0c0c0c",
                            border: "1px solid #222",
                            width: anchor === "left" || anchor === "right" ? 250 : "100%",
                          }
                        }}
                      >
                        <Box
                          sx={{ p: 2 }}
                          role="presentation"
                          onClick={() => setDrawerOpen(false)}
                        >
                          <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
                            เมนู Drawer
                          </Typography>
                          <List>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemText primary="หน้าหลัก" sx={{ color: "text.secondary" }} />
                              </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemText primary="หมวดหมู่หลัก" sx={{ color: "text.secondary" }} />
                              </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemText primary="ออกจากระบบ" sx={{ color: "text.secondary" }} />
                              </ListItemButton>
                            </ListItem>
                          </List>
                        </Box>
                      </Drawer>
                    </div>
                  )}

                  {activeComp.id === "appbar" && (
                    <Box sx={{ width: "100%", border: "1px solid #222", borderRadius: 1, overflow: "hidden" }}>
                      <AppBar position={position} color={color} sx={{ backgroundImage: "none" }}>
                        <Toolbar>
                          <IconButton edge="start" color="inherit" sx={{ mr: 2 }} onClick={() => alert("คลิกเมนูหลัก")}>
                            <MenuIcon />
                          </IconButton>
                          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Dev Library
                          </Typography>
                          <Button color="inherit" onClick={() => alert("ล็อกอิน")}>เข้าสู่ระบบ</Button>
                        </Toolbar>
                      </AppBar>
                    </Box>
                  )}

                  {activeComp.id === "menu" && (
                    <div>
                      <Button
                        variant="contained"
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        className="cursor-pointer"
                      >
                        เปิด Menu ป๊อปอัป
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                      >
                        <MenuItem onClick={() => { setAnchorEl(null); alert("ข้อมูลส่วนตัว"); }}>ข้อมูลส่วนตัว</MenuItem>
                        <MenuItem onClick={() => { setAnchorEl(null); alert("การตั้งค่า"); }}>การตั้งค่าระบบ</MenuItem>
                        <MenuItem onClick={() => { setAnchorEl(null); alert("ออกจากระบบ"); }}>ออกจากระบบ</MenuItem>
                      </Menu>
                    </div>
                  )}

                  {activeComp.id === "speed-dial" && (
                    <Box sx={{ position: "relative", height: 260, width: "100%", transform: "translateZ(0px)", flexGrow: 1 }}>
                      <SpeedDial
                        ariaLabel="SpeedDial basic demo"
                        sx={{ position: "absolute", bottom: 16, right: 16 }}
                        icon={<SpeedDialIcon />}
                        direction={direction}
                        hidden={hidden}
                      >
                        <SpeedDialAction icon={<FileCopyIcon />} slotProps={{ tooltip: { title: "คัดลอกไฟล์" } }} onClick={() => alert("คัดลอก")} />
                        <SpeedDialAction icon={<SaveIcon />} slotProps={{ tooltip: { title: "บันทึกข้อมูล" } }} onClick={() => alert("บันทึก")} />
                        <SpeedDialAction icon={<ShareIcon />} slotProps={{ tooltip: { title: "แชร์ความรู้" } }} onClick={() => alert("แชร์")} />
                      </SpeedDial>
                    </Box>
                  )}

                  {activeComp.id === "divider" && (
                    <Box sx={{ width: "100%", maxWidth: 350 }}>
                      <Typography sx={{ color: "text.secondary", mb: 1 }}>เนื้อหาตอนที่ 1</Typography>
                      <Divider
                        orientation={dividerOrientation}
                        variant={variant === "elevation" ? "fullWidth" : variant}
                        textAlign={dividerTextAlign}
                        sx={{ my: 2, borderColor: "#222" }}
                      >
                        <Chip label="อ่านต่อ" size="small" variant="outlined" sx={{ color: "primary.main", borderColor: "primary.main" }} />
                      </Divider>
                      <Typography sx={{ color: "text.secondary", mt: 1 }}>เนื้อหาตอนที่ 2</Typography>
                    </Box>
                  )}

                  {activeComp.id === "grid" && (
                    <Box sx={{ flexGrow: 1, width: "100%" }}>
                      <Grid container spacing={gridSpacing}>
                        {Array.from({ length: 12 / gridItemSize }).map((_, idx) => (
                          <Grid key={idx} size={gridItemSize}>
                            <Paper sx={{ p: 2, textAlign: "center", bgcolor: "#0c0c0c", color: "text.secondary", border: "1px solid #222" }}>
                              Size = {gridItemSize}
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}
                </div>
              )}

              {activeTab === "code" && (
                <div className="w-full relative">
                  <pre className="w-full rounded bg-black p-4 text-[13px] leading-relaxed text-[#ddd] border border-[#1e1e1e] overflow-x-auto whitespace-pre font-mono">
                    <code>{dynamicCode}</code>
                  </pre>
                  <button
                    onClick={handleCopyCode}
                    className="absolute right-3 top-3 cursor-pointer flex items-center gap-1.5 rounded border border-[#222] bg-[#111] px-2.5 py-1 text-xs text-[#aaa] hover:border-[#333] hover:text-white transition-colors"
                  >
                    {copiedCode ? (
                      <>
                        <Check size={11} className="text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={11} />
                        Copy Code
                      </>
                    )}
                  </button>
                </div>
              )}

              {activeTab === "props" && (
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#222] text-[#888]">
                        <th className="py-2.5 px-3 font-semibold">Prop Name</th>
                        <th className="py-2.5 px-3 font-semibold">Type</th>
                        <th className="py-2.5 px-3 font-semibold">Default</th>
                        <th className="py-2.5 px-3 font-semibold">
                          Description (คำอธิบาย)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e1e1e]">
                      {activeComp.props.map((p) => (
                        <tr
                          key={p.name}
                          className="text-[#bbb] hover:bg-white/[0.01]"
                        >
                          <td className="py-2.5 px-3 font-mono font-semibold text-blue-400">
                            {p.name}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-[#888]">
                            {p.type}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-[#666]">
                            {p.default}
                          </td>
                          <td className="py-2.5 px-3 text-[#999]">
                            {p.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 rounded border border-[#222] bg-[#0f0f0f] p-5 flex flex-col space-y-4">
            <div className="flex items-center gap-2 pb-2.5 border-b border-[#222]">
              <Sliders size={14} className="text-[#888]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#bbb]">
                Control Props
              </h4>
            </div>

            {(activeComp.id === "button" ||
              activeComp.id === "textfield" ||
              activeComp.id === "select" ||
              activeComp.id === "card" ||
              activeComp.id === "table" ||
              activeComp.id === "alert" ||
              activeComp.id === "badge-chip" ||
              activeComp.id === "progress" ||
              activeComp.id === "accordion" ||
              activeComp.id === "pagination" ||
              activeComp.id === "skeleton" ||
              activeComp.id === "button-group" ||
              activeComp.id === "drawer" ||
              activeComp.id === "divider") && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                  Variant
                </label>
                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value)}
                  className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                >
                  {activeComp.id === "button" && (
                    <>
                      <option value="contained">contained (ปุ่มทึบ)</option>
                      <option value="outlined">outlined (ปุ่มขอบเส้น)</option>
                      <option value="text">text (ปุ่มข้อความ)</option>
                    </>
                  )}
                  {(activeComp.id === "textfield" ||
                    activeComp.id === "select") && (
                    <>
                      <option value="outlined">outlined (ขอบเส้น)</option>
                      <option value="filled">filled (พื้นหลังทึบสว่าง)</option>
                      <option value="standard">standard (เส้นขีดล่าง)</option>
                    </>
                  )}
                  {activeComp.id === "card" && (
                    <>
                      <option value="elevation">elevation (เงาลอยตัว)</option>
                      <option value="outlined">outlined (ขอบเรียบ)</option>
                    </>
                  )}
                  {activeComp.id === "table" && (
                    <>
                      <option value="elevation">elevation (เงา)</option>
                      <option value="outlined">outlined (กรอบเส้น)</option>
                    </>
                  )}
                  {activeComp.id === "alert" && (
                    <>
                      <option value="standard">standard (โปร่งใสอ่อน)</option>
                      <option value="outlined">outlined (กรอบเส้น)</option>
                      <option value="filled">filled (สีทึบเข้ม)</option>
                    </>
                  )}
                  {activeComp.id === "badge-chip" && (
                    <>
                      <option value="filled">filled (ทึบสีหลัก)</option>
                      <option value="outlined">outlined (เส้นบางขอบ)</option>
                    </>
                  )}
                  {activeComp.id === "progress" && (
                    <>
                      <option value="indeterminate">indeterminate (โหลดไม่สิ้นสุด)</option>
                      <option value="determinate">determinate (แสดงตามค่า %)</option>
                    </>
                  )}
                  {activeComp.id === "accordion" && (
                    <>
                      <option value="elevation">elevation (เงาลอยตัว)</option>
                      <option value="outlined">outlined (มีขอบเส้น)</option>
                    </>
                  )}
                  {activeComp.id === "pagination" && (
                    <>
                      <option value="text">text (พื้นธรรมดา)</option>
                      <option value="outlined">outlined (มีกรอบเส้น)</option>
                    </>
                  )}
                  {activeComp.id === "skeleton" && (
                    <>
                      <option value="text">text (เส้นแถวข้อความ)</option>
                      <option value="circular">circular (วงกลม)</option>
                      <option value="rectangular">rectangular (สี่เหลี่ยมมุมฉาก)</option>
                      <option value="rounded">rounded (สี่เหลี่ยมมุมมน)</option>
                    </>
                  )}
                  {activeComp.id === "button-group" && (
                    <>
                      <option value="outlined">outlined (ขอบเส้น)</option>
                      <option value="contained">contained (ปุ่มทึบ)</option>
                      <option value="text">text (ปุ่มบางเบา)</option>
                    </>
                  )}
                  {activeComp.id === "drawer" && (
                    <>
                      <option value="temporary">temporary (ชั่วคราวคลิกปิดได้)</option>
                      <option value="persistent">persistent (คงค้างเปิดปิดได้)</option>
                      <option value="permanent">permanent (แสดงถาวร)</option>
                    </>
                  )}
                  {activeComp.id === "divider" && (
                    <>
                      <option value="fullWidth">fullWidth (เต็มกว้าง)</option>
                      <option value="inset">inset (เว้นขอบซ้าย)</option>
                      <option value="middle">middle (หดขอบซ้ายขวา)</option>
                    </>
                  )}
                </select>
              </div>
            )}

            {(activeComp.id === "button" ||
              activeComp.id === "textfield" ||
              activeComp.id === "checkbox-switch" ||
              activeComp.id === "badge-chip" ||
              activeComp.id === "tabs" ||
              activeComp.id === "progress" ||
              activeComp.id === "slider" ||
              activeComp.id === "pagination" ||
              activeComp.id === "button-group" ||
              activeComp.id === "radio-group" ||
              activeComp.id === "appbar") && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                  Color
                </label>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                >
                  {activeComp.id === "pagination" ? (
                    <>
                      <option value="standard">standard (สีเทาปกติ)</option>
                      <option value="primary">primary (สีฟ้าหลัก)</option>
                      <option value="secondary">secondary (สีม่วงรอง)</option>
                    </>
                  ) : activeComp.id === "appbar" ? (
                    <>
                      <option value="primary">primary (สีฟ้าหลัก)</option>
                      <option value="secondary">secondary (สีม่วงรอง)</option>
                      <option value="default">default (สีเทามาตรฐาน)</option>
                      <option value="inherit">inherit (ตามสีแม่)</option>
                      <option value="transparent">transparent (โปร่งใส)</option>
                    </>
                  ) : (
                    <>
                      <option value="primary">primary (สีฟ้า/น้ำเงินหลัก)</option>
                      <option value="secondary">secondary (สีม่วงรอง)</option>
                      <option value="success">success (สีเขียวสำเร็จ)</option>
                      <option value="error">error (สีแดงข้อผิดพลาด)</option>
                      <option value="warning">warning (สีส้มเตือนภัย)</option>
                      <option value="info">info (สีฟ้าแจ้งข้อมูล)</option>
                      {(activeComp.id === "button" ||
                        activeComp.id === "badge-chip" ||
                        activeComp.id === "tabs" ||
                        activeComp.id === "button-group") && (
                        <option value="inherit">inherit (ตาม Component แม่)</option>
                      )}
                      {activeComp.id === "tabs" && (
                        <option value="default">default (สีมาตรฐาน)</option>
                      )}
                    </>
                  )}
                </select>
              </div>
            )}

            {(activeComp.id === "button" ||
              activeComp.id === "textfield" ||
              activeComp.id === "select" ||
              activeComp.id === "checkbox-switch" ||
              activeComp.id === "dialog" ||
              activeComp.id === "table" ||
              activeComp.id === "progress" ||
              activeComp.id === "avatar" ||
              activeComp.id === "rating" ||
              activeComp.id === "button-group") && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                  {activeComp.id === "dialog"
                    ? "Width Size (ความกว้าง)"
                    : "Size (ขนาด)"}
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                >
                  {activeComp.id === "dialog" ? (
                    <>
                      <option value="small">xs (เล็กมาก)</option>
                      <option value="medium">sm (มาตรฐานกลาง)</option>
                      <option value="large">md (ใหญ่)</option>
                    </>
                  ) : activeComp.id === "progress" ? (
                    <>
                      <option value="small">small (30px)</option>
                      <option value="medium">medium (40px)</option>
                      <option value="large">large (60px)</option>
                    </>
                  ) : activeComp.id === "avatar" ? (
                    <>
                      <option value="small">small (32px)</option>
                      <option value="medium">medium (40px)</option>
                      <option value="large">large (56px)</option>
                    </>
                  ) : (
                    <>
                      <option value="small">small (เล็ก)</option>
                      <option value="medium">medium (ปานกลาง)</option>
                      {activeComp.id !== "textfield" &&
                        activeComp.id !== "select" && (
                          <option value="large">large (ใหญ่)</option>
                        )}
                    </>
                  )}
                </select>
              </div>
            )}

            {activeComp.id === "alert" && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                  Severity (ระดับความรุนแรง)
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                >
                  <option value="success">success (สำเร็จ - สีเขียว)</option>
                  <option value="info">info (ข้อมูลข่าวสาร - สีฟ้า)</option>
                  <option value="warning">warning (เตือนความจำ - สีส้ม)</option>
                  <option value="error">error (เกิดข้อผิดพลาด - สีแดง)</option>
                </select>
              </div>
            )}

            {(activeComp.id === "textfield" || activeComp.id === "autocomplete" || activeComp.id === "radio-group") && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Label (ป้ายชื่อหัวข้อ)
                  </label>
                  <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="w-full rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  />
                </div>
                {activeComp.id === "textfield" && (
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                      Helper Text (คำอธิบายด้านล่าง)
                    </label>
                    <input
                      type="text"
                      value={helperText}
                      onChange={(e) => setHelperText(e.target.value)}
                      className="w-full rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                    />
                  </div>
                )}
              </>
            )}

            {activeComp.id === "progress" && variant === "determinate" && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                  Progress Value (ความคืบหน้า: {progressValue}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progressValue}
                  onChange={(e) => setProgressValue(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
            )}

            {activeComp.id === "slider" && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Slider Value (ค่าแถบเลื่อน: {sliderValue})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Value Label Display (การแสดงตัวเลขบอกค่า)
                  </label>
                  <select
                    value={sliderValueLabel}
                    onChange={(e) => setSliderValueLabel(e.target.value)}
                    className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  >
                    <option value="on">on (แสดงค้าง)</option>
                    <option value="auto">auto (แสดงเมื่อลากเมาส์ชี้)</option>
                    <option value="off">off (ปิดการแสดง)</option>
                  </select>
                </div>
              </>
            )}

            {activeComp.id === "avatar" && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Avatar Shape (รูปทรง)
                  </label>
                  <select
                    value={avatarVariant}
                    onChange={(e) => setAvatarVariant(e.target.value)}
                    className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  >
                    <option value="circular">circular (วงกลม)</option>
                    <option value="rounded">rounded (มุมมน)</option>
                    <option value="square">square (สี่เหลี่ยมจัตุรัส)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Image URL (ลิ้งค์รูปภาพ)
                  </label>
                  <input
                    type="text"
                    value={avatarSrc}
                    onChange={(e) => setAvatarSrc(e.target.value)}
                    className="w-full rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  />
                </div>
              </>
            )}

            {activeComp.id === "tooltip" && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Tooltip Text (ข้อความแนะนำ)
                  </label>
                  <input
                    type="text"
                    value={tooltipTitle}
                    onChange={(e) => setTooltipTitle(e.target.value)}
                    className="w-full rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Placement (ตำแหน่งการแสดงผล)
                  </label>
                  <select
                    value={tooltipPlacement}
                    onChange={(e) => setTooltipPlacement(e.target.value)}
                    className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  >
                    <option value="top">top (ด้านบน)</option>
                    <option value="bottom">bottom (ด้านล่าง)</option>
                    <option value="left">left (ด้านซ้าย)</option>
                    <option value="right">right (ด้านขวา)</option>
                  </select>
                </div>
              </>
            )}

            {activeComp.id === "autocomplete" && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                  Selected Value (ค่าที่เลือก)
                </label>
                <select
                  value={autocompleteValue || ""}
                  onChange={(e) => setAutocompleteValue(e.target.value || null)}
                  className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                >
                  <option value="React">React</option>
                  <option value="Next.js">Next.js</option>
                  <option value="Tailwind CSS">Tailwind CSS</option>
                  <option value="Material UI">Material UI</option>
                  <option value="TypeScript">TypeScript</option>
                </select>
              </div>
            )}

            {activeComp.id === "pagination" && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Shape (รูปทรงปุ่ม)
                  </label>
                  <select
                    value={avatarVariant}
                    onChange={(e) => setAvatarVariant(e.target.value)}
                    className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  >
                    <option value="circular">circular (วงกลม)</option>
                    <option value="rounded">rounded (มุมมน)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Page Count (จำนวนหน้าทั้งหมด: {paginationCount})
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={paginationCount}
                    onChange={(e) => setPaginationCount(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  />
                </div>
              </>
            )}

            {activeComp.id === "breadcrumbs" && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Separator (ตัวคั่นลิ้งค์)
                  </label>
                  <input
                    type="text"
                    value={breadcrumbsSeparator}
                    onChange={(e) => setBreadcrumbsSeparator(e.target.value)}
                    className="w-full rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Max Items (จำนวนลิ้งค์สูงสุด: {breadcrumbsMaxItems})
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="10"
                    value={breadcrumbsMaxItems}
                    onChange={(e) => setBreadcrumbsMaxItems(Math.max(2, Number(e.target.value)))}
                    className="w-full rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  />
                </div>
              </>
            )}

            {activeComp.id === "rating" && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Rating Value (คะแนนดาว: {ratingValue})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step={ratingPrecision}
                    value={ratingValue || 0}
                    onChange={(e) => setRatingValue(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Precision (ความละเอียดของการเลือกดาว)
                  </label>
                  <select
                    value={ratingPrecision}
                    onChange={(e) => setRatingPrecision(Number(e.target.value))}
                    className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  >
                    <option value="1">1.0 (ดาวเต็มดวง)</option>
                    <option value="0.5">0.5 (ทีละครึ่งดวง)</option>
                  </select>
                </div>
              </>
            )}

            {activeComp.id === "skeleton" && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Animation (การขยับภาพโหลด)
                  </label>
                  <select
                    value={skeletonAnimation}
                    onChange={(e) => setSkeletonAnimation(e.target.value)}
                    className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  >
                    <option value="wave">wave (เลื่อนผ่านเหมือนคลื่น)</option>
                    <option value="pulse">pulse (กะพริบจางหาย)</option>
                    <option value="false">false (อยู่นิ่งไม่มีอนิเมชั่น)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Height Size (ความสูง: {skeletonHeight}px)
                  </label>
                  <input
                    type="number"
                    min="20"
                    max="300"
                    step="10"
                    value={skeletonHeight}
                    onChange={(e) => setSkeletonHeight(Number(e.target.value))}
                    className="w-full rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  />
                </div>
              </>
            )}

            {activeComp.id === "button-group" && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                  Orientation (การจัดวางแนว)
                </label>
                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value)}
                  className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                >
                  <option value="horizontal">horizontal (แนวนอน)</option>
                  <option value="vertical">vertical (แนวตั้ง)</option>
                </select>
              </div>
            )}

            {activeComp.id === "radio-group" && (
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs text-[#888]">
                  Row Layout (จัดเรียงแนวนอน)
                </span>
                <input
                  type="checkbox"
                  checked={alternativeLabel}
                  onChange={(e) => setAlternativeLabel(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-[#222] bg-black cursor-pointer text-white focus:ring-0"
                />
              </label>
            )}

            {activeComp.id === "list" && (
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs text-[#888]">
                  Dense Layout (ขนาดกระชับ)
                </span>
                <input
                  type="checkbox"
                  checked={dense}
                  onChange={(e) => setDense(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-[#222] bg-black cursor-pointer text-white focus:ring-0"
                />
              </label>
            )}

            {activeComp.id === "stepper" && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Active Step (ขั้นตอนปัจจุบัน: {activeStep + 1})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="1"
                    value={activeStep}
                    onChange={(e) => setActiveStep(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Orientation (การจัดวางสเตปเปอร์)
                  </label>
                  <select
                    value={orientation}
                    onChange={(e) => setOrientation(e.target.value)}
                    className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  >
                    <option value="horizontal">horizontal (แนวนอน)</option>
                    <option value="vertical">vertical (แนวตั้ง)</option>
                  </select>
                </div>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs text-[#888]">
                    Alternative Label (ป้ายอยู่ใต้ปุ่ม)
                  </span>
                  <input
                    type="checkbox"
                    checked={alternativeLabel}
                    onChange={(e) => setAlternativeLabel(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-[#222] bg-black cursor-pointer text-white focus:ring-0"
                  />
                </label>
              </>
            )}

            {activeComp.id === "drawer" && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Anchor (ทิศทางการสไลด์ออก)
                  </label>
                  <select
                    value={anchor}
                    onChange={(e) => setAnchor(e.target.value)}
                    className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  >
                    <option value="left">left (ซ้าย)</option>
                    <option value="right">right (ขวา)</option>
                    <option value="top">top (บน)</option>
                    <option value="bottom">bottom (ล่าง)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Drawer Variant (ประเภทสไลด์)
                  </label>
                  <select
                    value={variant}
                    onChange={(e) => setVariant(e.target.value)}
                    className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  >
                    <option value="temporary">temporary (ชั่วคราวคลิกปิดได้)</option>
                    <option value="persistent">persistent (คงค้างเปิดปิดได้)</option>
                    <option value="permanent">permanent (แสดงถาวรค้างจอ)</option>
                  </select>
                </div>
              </>
            )}

            {activeComp.id === "appbar" && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                  Position (ตำแหน่ง Navbar)
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                >
                  <option value="static">static (ไหลตามการเลื่อนปกติ)</option>
                  <option value="relative">relative (สัมพัทธ์)</option>
                  <option value="sticky">sticky (ตรึงเมื่อเลื่อนถึง)</option>
                  <option value="absolute">absolute (สัมบูรณ์ด้านบนสุด)</option>
                  <option value="fixed">fixed (ตรึงค้างบนหน้าจอ)</option>
                </select>
              </div>
            )}

            {activeComp.id === "speed-dial" && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Direction (ทิศทางการกางไอคอนด่วน)
                  </label>
                  <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                    className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  >
                    <option value="up">up (ลอยขึ้นด้านบน)</option>
                    <option value="down">down (ลงด้านล่าง)</option>
                    <option value="left">left (กางออกทางซ้าย)</option>
                    <option value="right">right (กางออกทางขวา)</option>
                  </select>
                </div>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs text-[#888]">
                    Hidden (ซ่อน SpeedDial)
                  </span>
                  <input
                    type="checkbox"
                    checked={hidden}
                    onChange={(e) => setHidden(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-[#222] bg-black cursor-pointer text-white focus:ring-0"
                  />
                </label>
              </>
            )}

            {activeComp.id === "divider" && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Orientation (แนวทิศทางเส้น)
                  </label>
                  <select
                    value={dividerOrientation}
                    onChange={(e) => setDividerOrientation(e.target.value)}
                    className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  >
                    <option value="horizontal">horizontal (แนวนอน)</option>
                    <option value="vertical">vertical (แนวตั้ง)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Text Align (ตำแหน่งชิปคั่นกลาง)
                  </label>
                  <select
                    value={dividerTextAlign}
                    onChange={(e) => setDividerTextAlign(e.target.value)}
                    className="w-full cursor-pointer rounded border border-[#1e1e1e] bg-black px-2.5 py-1.5 text-xs text-white focus:border-[#444] focus:outline-none"
                  >
                    <option value="center">center (อยู่กึ่งกลาง)</option>
                    <option value="left">left (จัดชิดซ้าย)</option>
                    <option value="right">right (จัดชิดขวา)</option>
                  </select>
                </div>
              </>
            )}

            {activeComp.id === "grid" && (
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Grid Spacing (ระยะห่างช่องลูก: {gridSpacing})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={gridSpacing}
                    onChange={(e) => setGridSpacing(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#888]">
                    Grid Item Size (ขนาดคอลัมน์: {gridItemSize})
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="1"
                    value={
                      gridItemSize === 3
                        ? 1
                        : gridItemSize === 4
                        ? 2
                        : gridItemSize === 6
                        ? 3
                        : 4
                    }
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const sizeMap = [3, 4, 6, 12];
                      setGridItemSize(sizeMap[val - 1]);
                    }}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#555] px-0.5 mt-1 font-mono">
                    <span>3 (4 ชิ้น)</span>
                    <span>4 (3 ชิ้น)</span>
                    <span>6 (2 ชิ้น)</span>
                    <span>12 (1 ชิ้น)</span>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 space-y-2.5 border-t border-[#1e1e1e] mt-2">
              
              {(activeComp.id === "button" ||
                activeComp.id === "textfield" ||
                activeComp.id === "select" ||
                activeComp.id === "checkbox-switch" ||
                activeComp.id === "slider" ||
                activeComp.id === "accordion" ||
                activeComp.id === "autocomplete" ||
                activeComp.id === "rating" ||
                activeComp.id === "button-group" ||
                activeComp.id === "radio-group") && (
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs text-[#888]">
                    Disabled (ปิดใช้งาน)
                  </span>
                  <input
                    type="checkbox"
                    checked={disabled}
                    onChange={(e) => setDisabled(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-[#222] bg-black cursor-pointer text-white focus:ring-0"
                  />
                </label>
              )}

              {activeComp.id === "textfield" && (
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs text-[#888]">
                    Error (มีข้อผิดพลาด)
                  </span>
                  <input
                    type="checkbox"
                    checked={error}
                    onChange={(e) => setError(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-[#222] bg-black cursor-pointer text-white focus:ring-0"
                  />
                </label>
              )}

              {activeComp.id === "rating" && (
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs text-[#888]">
                    Read Only (แสดงผลอย่างเดียว)
                  </span>
                  <input
                    type="checkbox"
                    checked={ratingReadOnly}
                    onChange={(e) => setRatingReadOnly(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-[#222] bg-black cursor-pointer text-white focus:ring-0"
                  />
                </label>
              )}

              {activeComp.id === "tooltip" && (
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs text-[#888]">
                    Show Arrow (แสดงหัวลูกศรชี้)
                  </span>
                  <input
                    type="checkbox"
                    checked={tooltipArrow}
                    onChange={(e) => setTooltipArrow(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-[#222] bg-black cursor-pointer text-white focus:ring-0"
                  />
                </label>
              )}

              {activeComp.id === "accordion" && (
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs text-[#888]">
                    Expanded (ขยายแผงข้อความออก)
                  </span>
                  <input
                    type="checkbox"
                    checked={accordionExpanded}
                    onChange={(e) => setAccordionExpanded(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-[#222] bg-black cursor-pointer text-white focus:ring-0"
                  />
                </label>
              )}

              {(activeComp.id === "button" ||
                activeComp.id === "textfield" ||
                activeComp.id === "select" ||
                activeComp.id === "card" ||
                activeComp.id === "dialog" ||
                activeComp.id === "tabs") && (
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs text-[#888]">
                    {activeComp.id === "card"
                      ? "Full Width (เต็มกว้าง)"
                      : activeComp.id === "tabs"
                        ? "Centered (อยู่กึ่งกลาง)"
                        : "Full Width (กว้างเต็มพื้นที่)"}
                  </span>
                  <input
                    type="checkbox"
                    checked={fullWidth}
                    onChange={(e) => setFullWidth(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-[#222] bg-black cursor-pointer text-white focus:ring-0"
                  />
                </label>
              )}

              {activeComp.id === "button" && variant === "contained" && (
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs text-[#888]">
                    Disable Elevation (ลบเงาปุ่ม)
                  </span>
                  <input
                    type="checkbox"
                    checked={disableElevation}
                    onChange={(e) => setDisableElevation(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-[#222] bg-black cursor-pointer text-white focus:ring-0"
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
}
