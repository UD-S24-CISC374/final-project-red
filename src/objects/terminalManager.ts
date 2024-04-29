import Phaser from "phaser";

export class TerminalManager {
    private inputElement: HTMLInputElement;
    private readonly prompt: string = "$> ";

    private eventEmitter: Phaser.Events.EventEmitter;

    constructor(eventEmitter: Phaser.Events.EventEmitter, fighting: boolean) {
        this.eventEmitter = eventEmitter;
        this.inputElement = document.createElement("input");
        this.inputElement.type = "text";

        //styling
        if (!fighting) {
            this.inputElement.style.position = "fixed";
            this.inputElement.style.bottom = "20px";
            this.inputElement.style.left = "25%";
            this.inputElement.style.width = "50%";
            this.inputElement.style.height = "80px";
            this.inputElement.style.border = "1px solid #ccc";
            this.inputElement.style.backgroundColor = "#2D2E2C";
            this.inputElement.style.color = "white";
        }
        if (fighting) {
            this.inputElement.style.position = "fixed";
            this.inputElement.style.bottom = "20px";
            this.inputElement.style.left = "25%";
            this.inputElement.style.width = "50%";
            this.inputElement.style.height = "80px";
            this.inputElement.style.border = "1px solid #ccc";
            this.inputElement.style.backgroundColor = "#2D2E2C";
            this.inputElement.style.color = "red";
        }

        document.body.appendChild(this.inputElement);

        this.inputElement.value = this.prompt;
        this.inputElement.focus();
        this.inputElement.addEventListener(
            "keydown",
            this.handleEnter.bind(this)
        );
    }

    public handleEnter(event: KeyboardEvent) {
        if (event.key === "Enter") {
            const userInput = this.inputElement.value;
            this.eventEmitter.emit("userInput", userInput);
            // Clear input field after processing
            this.inputElement.value = this.prompt;
        }
        if (event.key === " ") {
            this.inputElement.value += " ";
        }
        if (event.key == "Backspace") {
            //prevent the elimination of the prompt
            if (this.inputElement.value === this.prompt) {
                event.preventDefault();
            }
        }
    }
}
