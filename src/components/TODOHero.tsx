export interface TODOHeroProps  {
    todos_completed:number;
    total_todos:number
}
export const TODOHero = ({todos_completed, total_todos}:TODOHeroProps) => {
    return (
        <section className="todohero_section">
            <div className="">
                <p>Task Done</p>
                <p>Keep it up</p>
            </div>
            <div className="">
                <span>{todos_completed}/{total_todos}</span>
            </div>
        </section>
    )
}