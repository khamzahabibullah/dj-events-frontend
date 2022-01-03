import Layout from '@/components/Layout';
import DashboardEvent from '@/components/DashboardEvent';
import {API_URL} from '@/config/index';
import {parseCookie} from '@/helpers/index';
import styles from '@/styles/Dashboard.module.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/router';

const DashboardPage = ({events, token}) => {
  const router = useRouter();

  const deleteEvent = async (id) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboards</h1>
        <h3>My Events</h3>

        {events.map((evt) => (
          <DashboardEvent
            key={evt.id}
            evt={evt}
            handleDelete={deleteEvent}
          ></DashboardEvent>
        ))}
      </div>
    </Layout>
  );
};

export async function getServerSideProps({req}) {
  const {token} = parseCookie(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {events, token},
  };
}

export default DashboardPage;
