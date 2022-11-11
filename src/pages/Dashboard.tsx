import { useState, SyntheticEvent } from 'react'
import moment from 'moment'

import Layout from '../components/Layout'

const dateFormat = (d: string) => {
  return moment(d).format('MMM DD, YYYY HH:mm')
}

const GoogleAuth = () => {
  const [gLoggedIn, setGLoggedIn] = useState(false)

  const googleLogin = async () => {
    const googleAuth = window.gapi.auth2.getAuthInstance()
    googleAuth.signIn().then(() => {
      setGLoggedIn(true)
    })
  }

  return (
    <>
      <button
        onClick={googleLogin}
        className={`inline-flex items-center px-4 py-2 font-bold text-white bg-green-600 rounded shadow`}
      >
        Sign in to Google
      </button>
    </>
  )
}

function Dashboard() {
  const [events, setEvents] = useState([])

  const getCalendar = async () => {
    window.gapi.client.load('calendar', 'v3')

    window.gapi.client.calendar.events
      .list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      })
      .then((events: any) => {
        setEvents(events.result.items)
      })
      .catch((err: any) => console.error(err))
  }

  const insertEvent = async (
    _start: string,
    _end: string,
    summary: string,
    description: string
  ) => {
    await window.gapi.client.calendar.events.insert({
      calendarId: 'primary',
      start: {
        dateTime: _start,
      },
      end: {
        dateTime: _end,
      },
      summary,
      description,
    })

    await getCalendar()
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const _start = moment(formData.get('startTime') as string).format()
    const _end = moment(formData.get('endTime') as string).format()
    const summary = formData.get('summary') as string
    const description = formData.get('description') as string

    insertEvent(_start, _end, summary, description).catch((err) =>
      console.error(err.error)
    )
  }

  return (
    <Layout title="Dashboard">
      <article>
        <div className="-mx-2">
          <GoogleAuth />
          <button
            className="p-2 m-2 font-bold text-white bg-green-600 rounded shadow"
            onClick={getCalendar}
          >
            Get Events
          </button>
        </div>
        <h2 className="my-4 text-lg font-bold">Upcoming Events</h2>
        <div className="mt-4 space-y-4">
          {events.map((item: any) => {
            return (
              <div className="flex flex-wrap p-4 my-2 rounded bg-gray-50">
                <div className="sm:w-72 sm:max-w-3xl">
                  <h4 className="text-xl font-bold">
                    <a href={item.htmlLink} target="_blank" rel="noreferrer">
                      {item.summary}
                    </a>
                  </h4>
                  <p className="mt-1 text-sm">
                    {`${dateFormat(item.start.dateTime)} - ${dateFormat(
                      item.end.dateTime
                    )}`}
                  </p>
                </div>
                {item.description && (
                  <p className="sm:ml-4">{item.description}</p>
                )}
              </div>
            )
          })}
        </div>
        <hr className="my-4" />

        <h2 className="my-4 text-lg font-bold">Add events</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap max-w-3xl -mx-3">
            <div className="w-full px-3 mb-5 sm:w-1/2">
              <label htmlFor="startTime" className="block mb-1 font-medium">
                Start Time
              </label>
              <input
                required
                type="datetime-local"
                name="startTime"
                id="startTime"
                placeholder="Nov 13, 2022 11:00"
                className="w-full p-2 border-2 border-gray-200 rounded-md outline-none focus:border-gray-300 focus:shadow-md"
              />
            </div>
            <div className="w-full px-3 mb-5 sm:w-1/2">
              <label htmlFor="endTime" className="block mb-1 font-medium">
                End Time
              </label>
              <input
                required
                type="datetime-local"
                name="endTime"
                id="endTime"
                placeholder="Nov 13, 2022 13:00"
                className="w-full p-2 border-2 border-gray-200 rounded-md outline-none focus:border-gray-300 focus:shadow-md"
              />
            </div>
            <div className="w-full px-3 mb-5">
              <label htmlFor="summary" className="block mb-1 font-medium">
                Event Title
              </label>
              <input
                required
                type="text"
                name="summary"
                id="summary"
                placeholder="Conquer the world"
                className="w-full p-2 border-2 border-gray-200 rounded-md outline-none focus:border-gray-300 focus:shadow-md"
              />
            </div>
            <div className="w-full px-3 mb-5">
              <label htmlFor="description" className="block mb-1 font-medium">
                Event Description
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Lorem ipsum dolor sit amet"
                className="w-full p-2 border-2 border-gray-200 rounded-md outline-none focus:border-gray-300 focus:shadow-md"
              />
            </div>
            <div>
              <button className="px-8 py-3 mx-3 text-base font-semibold text-center text-white rounded-md outline-none bg-sky-600 hover:shadow-form">
                Submit
              </button>
            </div>
          </div>
        </form>
      </article>
    </Layout>
  )
}

export default Dashboard
