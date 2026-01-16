
export interface StudentInGroupSetBlockingDateModel {
  studentId: string;
  groupId: string;
  shouldBlockOnUtc: string;
}

export interface StudentInGroupSetBlockingModel {
  studentId: string;
  groupId: string;
  isBlocked: boolean;
}

export interface GetMyStudentGroupBlockRequest {
  groupId: string;
  timeZoneMinutesOffSet: number | null;
}

export interface StudentInGroupWithBlockModel {
  studentId: string;
  groupId: string;
  isBlocked: boolean;
  shouldCreateCourseEntities: boolean;
  enteredOnUtc: string;
  shouldBlockOnUtc: string | null;
  showProlongationPaymentPlans: boolean;
  prolongationNotificationTitle: string;
  prolongationNotificationText: string;
}