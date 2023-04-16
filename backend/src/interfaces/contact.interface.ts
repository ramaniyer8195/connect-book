import mongoose from "mongoose";

// route: /contact/:contactId GET, PUT, DELETE
export interface ContactParams {
  contactId: string;
}

interface Email {
  emailId: string;
  isPrimary: boolean;
}

interface Website {
  websiteName: string;
  isPrimary: boolean;
}

export interface Event {
  event: mongoose.Types.ObjectId;
  date: Date;
}

// route: /contact/:contactId PUT
// route: /create
export interface ContactBody {
  firstName?: string;
  lastName?: string;
  nickName?: string;
  addressLine1?: string;
  addressLine2?: string;
  pincode?: number;
  primaryNumber?: string;
  secondaryNumbers?: string[];
  emails?: Email[];
  websites?: Website[];
  standardEvents?: Event[];
  customEvents?: Event[];
  favorite?: boolean;
  family?: mongoose.Types.ObjectId;
}

// route: /events/:month&:year
export interface GetEventParams {
  month: number;
}
