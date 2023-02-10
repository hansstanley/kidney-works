import { Card, Stack } from 'react-bootstrap';
import { Page, PageBody, PageHeader } from '../../components/Page';
import useBlogs from '../../hooks/useBlogs';
import useUserInfo from '../../hooks/useUserInfo';
import { useAuth } from '../../hooks/useAuth';
import BlogStory from './BlogStory';

export default function BlogPage() {
  const { signOutOfSessionWithoutReload } = useAuth();

  const { created, fetched } = useUserInfo();
  if (!created && fetched) {
    signOutOfSessionWithoutReload();
  }
  const { blogs } = useBlogs();

  const hasBlogs = !!blogs.length;

  return (
    <Page>
      <PageHeader noDivider title="Blog" tagline="Make your voice heard" />
      <PageBody>
        <Stack gap={3}>
          {hasBlogs ? (
            blogs.map((b) => (
              <BlogStory blog={b}/>
            ))
          ) : (
            <Card>
              <Card.Body>
                <Card.Text>No blogs.</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Stack>
      </PageBody>
    </Page>
  );
}
