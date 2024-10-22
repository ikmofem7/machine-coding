import "./styles.css";
import { useBoard } from "./hooks";
import { Bucket } from "./type";
import { AddElement } from "./components/AddCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// rendering task and add buckets
// add buckets and task
// drag and drop buckets and tasks

const TrelloBoard = () => {
  const { board, addBuckets, dragBuckets, addTask } = useBoard();
  const { buckets, tasks, bucketOrder } = board;
  const handleAddBuckets = (title: string) => {
    const bucket: Bucket = {
      id: `bucket-${bucketOrder.length + 1}`,
      title,
      taskIds: [],
    };
    addBuckets(bucket);
  };

  const handleAddTasks = (bucketId: string) => (title: string) => {
    const payload = {
      id: `task-${Date.now()}`,
      title,
      bucketId,
    };
    addTask(payload);
  };

  return (
    <DragDropContext onDragEnd={dragBuckets}>
      <Droppable droppableId="board" type="Board" direction="horizontal">
        {(provided) => {
          return (
            <div
              className="trello-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {bucketOrder.map((bucketId, index) => {
                const { id, title, taskIds } = buckets[bucketId];
                const individualBucketTasks = taskIds?.map((id) => tasks[id]);
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div
                        key={id}
                        id={id}
                        className="bucket"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="wrapper">
                          <div className="title-container">
                            <h3> {title} </h3>
                            <h4>X</h4>
                          </div>
                          <Droppable droppableId={id} type="Task">
                            {(dropProvided) => (
                              <div
                                className="cards"
                                ref={dropProvided.innerRef}
                                {...dropProvided.droppableProps}
                              >
                                {individualBucketTasks?.map((task, index) => {
                                  const { title, id } = task;
                                  return (
                                    <Draggable
                                      key={id}
                                      draggableId={id}
                                      index={index}
                                    >
                                      {(provided) => (
                                        <div
                                          className="task"
                                          key={id}
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          {title}
                                        </div>
                                      )}
                                    </Draggable>
                                  );
                                })}
                                {dropProvided.placeholder}
                              </div>
                            )}
                          </Droppable>

                          <div className="add-card-container">
                            <AddElement
                              onAddElement={handleAddTasks(bucketId)}
                              title="Add Card"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              <AddElement
                onAddElement={handleAddBuckets}
                title="Add List"
                className="add-list-container"
              />
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};
export { TrelloBoard };
