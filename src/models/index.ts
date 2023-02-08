export type PrknSpace = {
  occupied: boolean;
  spaceNumber: number;
  parkingDate?: string;
  color?: string;
};
export type Process = "parking" | "exiting";

export type ModalContent = {
  title: string;
  description: string;
  onConfirm: () => void;
};

export type ModalProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<Boolean>>;
  title?: string;
  description?: string;
  onConfirm?: () => void;
};

export type ParkingSpaceProps = {
  occupied: boolean;
  spaceNumber: number;
  src?: string;
  Process?: Process;
  onClick: () => void;
};

export type CostTabProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

export type Analytics = {
  analytic: string;
  total: number;
};

export type AnalyticTabProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  analytics: Array<Analytics>;
};
