import openai
from dotenv import find_dotenv, load_dotenv
import time
import logging
from datetime import datetime

load_dotenv()
# openai.api_key = os.environ.get("OPENAI_API_KEY")
# defaults to getting the key using os.environ.get("OPENAI_API_KEY")
# if you saved the key under a different environment variable name, you can do something like:
# client = OpenAI(
#   api_key=os.environ.get("CUSTOM_ENV_NAME"),
# )


client = openai.OpenAI()
model = "gpt-3.5-turbo-16k"

personal_trainer_assistant = client.beta.assistants.create(
    name="Personal Trainer",
    instructions="""You are very experience personal trainer, with a lot of achievements in this field. You an expert in adjusting training plans for individual needs.
    You have background in weightlifting, CrossFit and fitness.""",
    model=model
)

# assistant_id = personal_trainer_assistant.id
# print(assistant_id)



# thread creation
# thread = client.beta.threads.create(
#     messages=[
#         {
#             "role":"user",
#             "content": "How to create a workout plan in order to get muscle and be in shape, what to consider during plan creation, provide examples"
#         }
#     ]
# )

# thread_id = thread.id
# print(thread_id)

# hardcode ids
assistant_id = "asst_uc46ZTyw5D4zZTULZYM9smWV"
thread_id = "thread_XP8HFcB93i90CtYndhkFCqwR"

# CREATE A MESSAGE
message = "Base on the previous question, prepare an example one week plan, with 3 days dedicated for the training"
message = client.beta.threads.messages.create(
    thread_id = thread_id,
    role = "user",
    content = message
)

# RUN ASSISTANT
run = client.beta.threads.runs.create(
    thread_id=thread_id,
    assistant_id = assistant_id,
    instructions = "Please address the user as James Bond"
)

def wait_for_run_completion(client, thread_id, run_id, sleep_interval=5):
    """

    Waits for a run to complete and prints the elapsed time.:param client: The OpenAI client object.
    :param thread_id: The ID of the thread.
    :param run_id: The ID of the run.
    :param sleep_interval: Time in seconds to wait between checks.
    """
    while True:
        try:
            run = client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run_id)
            if run.completed_at:
                elapsed_time = run.completed_at - run.created_at
                formatted_elapsed_time = time.strftime(
                    "%H:%M:%S", time.gmtime(elapsed_time)
                )
                print(f"Run completed in {formatted_elapsed_time}")
                logging.info(f"Run completed in {formatted_elapsed_time}")
                # Get messages here once Run is completed!
                messages = client.beta.threads.messages.list(thread_id=thread_id)
                last_message = messages.data[0]
                response = last_message.content[0].text.value
                print(f"Assistant Response: {response}")
                break
        except Exception as e:
            logging.error(f"An error occurred while retrieving the run: {e}")
            break
        logging.info("Waiting for run to complete...")
        time.sleep(sleep_interval)


        # RUN
wait_for_run_completion(client=client, thread_id=thread_id, run_id=run.id)

# ==== Steps --- Logs ==
run_steps = client.beta.threads.runs.steps.list(thread_id=thread_id, run_id=run.id)
print(f"Steps---> {run_steps.data[0]}")