import React, { FC } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

interface IssueListItem {
  assignee: null;
  comments: string[];
  completedDate: null;
  createdBy: string;
  createdDate: string;
  dueDate: string;
  id: string;
  labels: string[];
  number: number;
  title: string;
  status?: string;
}

interface IssueListItemProps {
  title: string;
  number: number;
  assignee: null;
  commentCount: number;
  createdBy: string;
  createdDate: string;
  labels: string[];
  status: string | undefined;
}

const IssuesListItem: FC<IssueListItemProps> = ({
  title,
  number,
  assignee,
  commentCount,
  createdBy,
  createdDate,
  labels,
  status,
}) => {
  return (
    <li>
      <div>{status === "done" || status === "cancelled"}</div>
    </li>
  );
};

const IssuesList: FC = () => {
  const issuesQuery = useQuery(["labels"], () =>
    fetch(`${import.meta.env.VITE_API_URL}/issues`).then((res) => res.json())
  );

  console.log(issuesQuery);

  return (
    <div>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {issuesQuery?.data?.map(
            ({
              id,
              title,
              number,
              assignee,
              createdBy,
              createdDate,
              labels,
              status,
              comments,
            }: IssueListItem) => (
              <IssuesListItem
                key={id}
                title={title}
                number={number}
                assignee={assignee}
                commentCount={comments.length}
                createdBy={createdBy}
                createdDate={createdDate}
                labels={labels}
                status={status}
              />
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default IssuesList;
