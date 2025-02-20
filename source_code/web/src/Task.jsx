import React from "react";

export default function Task({ task, onDone, onEdit, onDoclink, isDashboard }) {
    // enable doclink if we have a doclink, or, if we don't have a doclink, we have a client who is not the current client

  const calculateDueDate = (due) => {
    const currentDate = new Date();
    const dueDate = new Date(due);
    const differenceInDays = Math.ceil(
      (dueDate - currentDate) / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays === 0) return "Today";
    if (differenceInDays === -1) return "Yesterday";
    if (differenceInDays === 1) return "Tomorrow";
    if (differenceInDays > 1) return `In ${differenceInDays} days`;
    return `${Math.abs(differenceInDays)} days ago`;
  };

  return (
    <div
        onClick={() => onEdit(task)}
      style={{
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        margin: "10px",
        position: "relative",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        height: "150px", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer"
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "18px" }}>{task.name}</h3>
          {(!task.noTasks && <p style={{ fontSize: "14px", color: "#888" }}>
            {calculateDueDate(task.due)}
          </p>
          )}
        </div>
        {task.client && isDashboard && (
          <p style={{ fontSize: "14px", fontWeight: 100, position: "absolute", bottom: -5  }}>
          {task.client ? task.client.name : "General"}
        </p>
        )}
        <p style={{ margin: "5px 0", fontSize: "14px" }}>{task.description}</p>
      </div>

      {!task.noTasks && (<div style = {{display: "flex", justifyContent: "flex-end", gap: 5, position: "absolute",
          bottom: "10px",
          right: "10px",}}>

        {task.doclink && (
        <button
            style={{
            
            backgroundColor: "#aaa",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            padding: "5px 15px",
            cursor: "pointer",
            fontSize: "14px",
            }}
            onClick={(e) => {task.type === "send" ? onDone({...task, type: ""}, true) : onDone(task, true); e.stopPropagation();}}

            
        >
            Dismiss
        </button>
        )}
        
        <button
            style={{
            
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            padding: "5px 15px",
            cursor: "pointer",
            fontSize: "14px",
            }}
            onClick={(e) => {
            !task.doclink? onDone(task) :
                task.type === "send" ?  onDone(task): onDoclink(task); 
                e.stopPropagation();}}
        >
            {task.doclink? ( 
                task.type === "send" ? "Send" : 
                task.type === "complete" ? "Continue" 
                : "Finish") 
            
            // No doclink, standard task
            : task.noTasks ? "Create" : "Done"}

        </button>


      </div>
      )}
    </div>
  );
}
