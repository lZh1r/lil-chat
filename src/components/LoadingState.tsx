export default function LoadingState() {
    return (
        <div className={"flex space-x-5"}>
            <div className={"rounded-full p-1 bg-foreground animate-bounce"}/>
            <div className={"rounded-full p-1 bg-foreground animate-bounce delay-50"}/>
            <div className={"rounded-full p-1 bg-foreground animate-bounce delay-100"}/>
        </div>
    );
}