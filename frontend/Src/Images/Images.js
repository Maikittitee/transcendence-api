export class Images {

    #files;
    #filePaths;

    constructor () {
        this.#files = {};
        this.#filePaths = ["./Src/Images/file/1.png",
                        "./Src/Images/file/2.png", 
                        "./Src/Images/file/3.png",
                        "./Src/Images/file/4.png",
                        "./Src/Images/file/5.png",
                        "./Src/Images/file/6.png",
                        "./Src/Images/file/7.png",
                        "./Src/Images/file/8.png",
                        "./Src/Images/file/9.png",
                        "./Src/Images/file/10.png",
                        "./Src/Images/file/11.png",
                        "./Src/Images/file/12.png", 
                        "./Src/Images/file/13.png",
                        "./Src/Images/file/14.png",
                        "./Src/Images/file/15.png",
                        "./Src/Images/file/16.png",
                        "./Src/Images/file/17.png",
                        "./Src/Images/file/18.png",
                        "./Src/Images/file/19.png",
                        "./Src/Images/file/BackGroundVideo.mp4",
                        "./Src/Images/file/MeowBackGroundSong.mp3",
                        "./Src/Images/file/MeowPongTitle.png",
                        "./Src/Images/file/ball.png",
                        "./Src/Images/file/opponent.png",
                        "./Src/Images/file/player.png",
        ];
    }

    async loadFiles() {
        for (let path of this.#filePaths) {
            const filename = path.split("/").pop();
            try {
                const response = await fetch(path);
                if (!response.ok) throw new Error(`Failed to load ${filename}`);
                const fileBlob = await response.blob();  // แปลงเป็น binary data
                this.#files[filename] = URL.createObjectURL(fileBlob); // สร้าง URL สำหรับไฟล์
                // console.log(this.#files[filename])
            } catch (error) {
                console.error(error);
            }
        }
    }

    getFile(filename) {
        return this.#files[filename]
    }
}