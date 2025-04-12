export type ImageT = {
  src: string,
  alt: string,
}

export type ContentT = {
  title: string,
  description?: string,
}

export type FormData = Record<string, string | number | boolean | File | null>;

export type Work = {
  id: number;
  title: string;
  subtitle: string;
  subcategory: string | null;
  fileAccessLink: {
    accessType: string;
    url: string;
    mimeType: string;
  };
  likes: number;
  date: string;
  region: string;
  public: boolean;
  hidden: boolean;
  currentUserVoted?: boolean;
};
