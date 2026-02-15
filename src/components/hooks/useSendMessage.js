import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: (payload) =>
      axios
        .post(`${import.meta.env.VITE_BACKEND}chat/chat`, payload)
        .then(res => res.data),

    onMutate: async (newMsg) => {

      await queryClient.cancelQueries(["chat"]);

      const previous = queryClient.getQueryData(["chat"]);

      queryClient.setQueryData(["chat"], (old) => {

    if (!old) return old;

    const newPages = old.pages.map((page, index) => {

      if (index !== 0) return page;

      return {
        ...page,
        messages: [

          

          {
            _id: "typing-" + Date.now(),
            role: "assistant",
            typing: true,
            createdAt: new Date().toISOString(),
          },
         {
            _id: "pending-" + Date.now(),
            role: "user",
            text: newMsg.message || "",
            imageUrl: newMsg.imageUrl || "",
            pending: true,
            createdAt: new Date().toISOString(),
          },
          ...page.messages,

        ],
      };

    });

    return {
      ...old,
      pages: newPages,
    };

  });
      return { previous };
    },

    onError: (err, newMsg, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["chat"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(["chat"]);
    },

  });
}