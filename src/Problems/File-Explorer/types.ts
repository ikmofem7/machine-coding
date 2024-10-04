type Explorer = {
    id: string;
    name: string;
    isFolder: boolean;
    items?: Explorer[];
};

export { Explorer }