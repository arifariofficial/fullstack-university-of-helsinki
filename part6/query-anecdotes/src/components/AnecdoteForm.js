import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../request";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    },
    onError: (error) => {
      notificationDispatch({ type: "ERROR", payload: error.response.data });
      setTimeout(() => {
        notificationDispatch({ type: "RESET" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
    notificationDispatch({ type: "NEW_ANECDOTE", payload: content });
    setTimeout(() => {
      notificationDispatch({ type: "RESET" });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
