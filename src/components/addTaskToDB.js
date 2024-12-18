import { addDoc, collection } from "firebase/firestore";
import { db } from './firebase'; // Your Firestore database instance
import { auth } from './firebase'; // Your Firebase authentication instance

const addTaskToDB = async (task) => {
  const userId = auth.currentUser.uid; // Get the authenticated user's ID
  
  if (!userId) {
    console.error("No user is authenticated.");
    return;
  }

  try {
    // Add the task to the user's specific sub-collection
    const docRef = await addDoc(collection(db, "users", userId, "taskList"), {
      title: task.title,
      dueDate: task.dueDate,
      completed: task.completed,
      priority: task.priority,
      notes: task.notes,
    });

    console.log("Task added with ID: ", docRef.id); // Log the task's ID
  } catch (error) {
    console.error("Error adding task: ", error); // Log any errors that occur
  }
};

export default addTaskToDB;
