import store from "../store/store.ts";

export type CustomError = {
    status: number;
    data: {
        success: boolean;
        message: string;
        payload?: any;
    };
};

export type RootState = ReturnType<typeof store.getState>;

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password?: string;
    avatar: {
        url: string;
        public_id: string;
    };
    role: string;
    isVerified: boolean;
    courses: object[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}




export interface IResponse {
    success:boolean;
    message:string;
    payload?:any;
}



export interface ICourseFormValues {
    thumbnail: string;
    name: string;
    price: number;
    estimatedPrice: number;
    tags: string;
    level: string;
    description: string;
    demoUrl: string;
    benefits: { title: string }[];
    prerequisites: { title: string }[];
    courseData: {
        title: string;
        videoDescription: string;
        videoUrl: string;
        videoSection: string;
        videoLength: number | null;
        videoPlayer: string;
        links: { title: string; url: string }[];
        suggestion?:string;
    }[];
}


export interface IArrayFieldError<T> {
    [index: number]: T
}


export interface ICourseFormErrors {
    benefits?: IArrayFieldError<{
        title?: {
            message: string
        }
    }>;
    prerequisites?: IArrayFieldError<{
        title?: {
            message: string
        }
    }>;
}

export interface ICourseContentErrors {
    [index:number]: {
        title?: {
            message: string
        },
        videoSection?: {
            message: string
        },
        videoUrl?: {
            message: string
        },
        videoLength?: {
            message: string
        },
        suggestion?: {
            message: string
        },
        videoPlayer?:{
            message: string
        },
        videoDescription?:{
            message: string
        }
        links?: {
            [index:number]: {
                title?: {
                    message: string
                },
                url?: {
                    message: string
                }
            }
        }
    }
}