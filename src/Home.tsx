import ChatInput from "@/components/ChatInput.tsx";

function Home() {

    return(
        <div className={"h-screen w-full flex flex-col justify-center space-y-5"}>
            <h1 className={"text-center text-2xl"}>Welcome back</h1>
            <ChatInput/>
        </div>
    );
}

export default Home;
