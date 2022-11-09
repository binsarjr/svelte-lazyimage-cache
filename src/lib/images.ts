export const imageComplete = (imageURL: string) =>
    new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(image);

        image.src = imageURL;
    });
