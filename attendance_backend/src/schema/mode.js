import { model } from "mongoose";

import { attendanceSchema } from "./attendanceSchema.js";
import { studentSchema } from "./studentSchema.js";
import { teacherSchema } from "./teacherSchema.js";
import { batchSchema } from "./batchId.js";
import { adminSchema } from "./adminSchema.js";

export let Attendance = model("Attendance", attendanceSchema);
export let Student = model("Student", studentSchema);
export let Teacher = model("Teacher", teacherSchema);
export let Batch = model("Batch", batchSchema);
export let Admin = model("Admin", adminSchema);
