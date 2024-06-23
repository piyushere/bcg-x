import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  ElectricityApplSchema,
  ElectricityApplication,
} from '@/schemas/application.schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DatePicker from '../ui/date';
import { Textarea } from '../ui/textarea';

const ApplicationForm = ({
  value,
  submit,
}: {
  value: ElectricityApplication | undefined;
  submit: (value: ElectricityApplication) => void;
}) => {
  const form = useForm<ElectricityApplication>({
    defaultValues: value,
    resolver: zodResolver(ElectricityApplSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application ID</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormDescription>Unique application ID</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="applicantName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of Applicant</FormLabel>
              <FormControl>
                <Input
                  className="capitalize"
                  placeholder="Your name"
                  {...field}
                />
              </FormControl>
              <FormDescription>Full name of the applicant</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Gender of the applicant</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="govtIdType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Govt ID Type</FormLabel>
              <FormControl>
                <Select
                  disabled
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="ID Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aadhar">Aadhar</SelectItem>
                    <SelectItem value="pan">PAN</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="voter_id">Voter ID</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Type of govt id</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="govtIdNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Govt ID number</FormLabel>
              <FormControl>
                <Input placeholder="ID" {...field} />
              </FormControl>
              <FormDescription>Your govt ID number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <Input
                  className="capitalize"
                  placeholder="District"
                  {...field}
                />
              </FormControl>
              <FormDescription>District of residence</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />{' '}
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input className="capitalize" placeholder="State" {...field} />
              </FormControl>
              <FormDescription>Your state / UT</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />{' '}
        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  minLength={6}
                  maxLength={6}
                  placeholder="Pin code"
                  {...field}
                />
              </FormControl>
              <FormDescription>Postal code of the area</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateSubmitted"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date Applied</FormLabel>
              <FormControl>
                <DatePicker
                  disabled
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormDescription>Date of application</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ownership"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ownership</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ownership" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joint">Joint</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Ownership type, e.g. Joint, Individual
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="loadApplied"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Load</FormLabel>
              <FormControl>
                <Input placeholder="Load in kV" {...field} />
              </FormControl>
              <FormDescription>Required load in kV</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="residential">Residential</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Category of the connection</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Status</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="connection released">
                      Connection Released
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Status of the application</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateApproved"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date Approved</FormLabel>
              <FormControl>
                <DatePicker
                  onChange={field.onChange}
                  value={field.value ? new Date(field.value) : undefined}
                />
              </FormControl>
              <FormDescription>Date of approval</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reviewerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reviewer ID</FormLabel>
              <FormControl>
                <Input placeholder="ID" {...field} />
              </FormControl>
              <FormDescription>Reviewer ID</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reviewerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reviewer Name</FormLabel>
              <FormControl>
                <Input className="capitalize" placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>Name of the last reviewer</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reviewComments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Comments</FormLabel>
              <FormControl>
                <Textarea placeholder="your comments..." {...field} />
              </FormControl>
              <FormDescription>Your review comments</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastModified"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Updated</FormLabel>
              <FormControl>
                <DatePicker
                  disabled
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormDescription>Last modified date</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
};
export default ApplicationForm;
