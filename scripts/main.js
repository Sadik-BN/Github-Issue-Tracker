const issueCount = document.getElementById("issue-count");


const loadIssues = async () => {
    const serverData = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues").then(response => response.json());

    displayIssues(serverData.data);
};



const displayIssues = (Issues) => {
    const issuesContainer = document.getElementById("card-container");
    issuesContainer.innerHTML = "";
    issueCount.innerText = `${Issues.length} Issues`;
    Issues.forEach(Issue => {
        let newDiv = document.createElement("div");

        const labelsHTML = Issue.labels.map(label => 
            `
                <p class="text-[#D97706] text-[12px] font-medium bg-[#D977061a] rounded-full px-6 py-1 text-center"> ${label} </p>
            `
        ).join("");

        newDiv.innerHTML = `
                <div class="shadow-md rounded-md border-t-2 ${Issue.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]"} space-y-3 p-4">
                    <div class="flex justify-between items-center">
                        <img src="${Issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="">
                        <p
                            class="text-[${Issue.priority === "high" ? "#EF4444" : Issue.priority === "medium" ? "#F59E0B" : "#9CA3AF"}] text-[12px] font-medium bg-[${Issue.priority === "high" ? "#EF44441a" : Issue.priority === "medium" ? "#F59E0B1a" : "#9CA3AF1a"}] rounded-full px-6 py-1 text-center">
                            ${Issue.priority.toUpperCase()}</p>
                    </div>
                    <h3 class="text-[14px] font-semibold">${Issue.title}</h3>
                    <p class="text-[12px] text-[#64748B]">${Issue.description}</p>
                    <div class="flex gap-1">
                        ${labelsHTML}
                    </div>
                    <div class="border-t-[1px] border-gray-300 mt-[12px] pt-3">
                        <p class="text-[#64748B] text-[12px]">#${Issue.id} by ${Issue.author}</p>
                        <p class="text-[#64748B] text-[12px]">${Issue.createdAt}</p>
                    </div>
                </div>

        `
        issuesContainer.appendChild(newDiv);

    });
}

loadIssues();